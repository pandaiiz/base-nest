import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { BadRequestException, Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { isEmpty, isNil } from 'lodash'
import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'
import { ROOT_ROLE_ID } from '~/constants/system.constant'
import {
  genAuthPermKey,
  genAuthPVKey,
  genAuthTokenKey,
  genOnlineUserKey
} from '~/helper/genRedisKey'

import { AccountUpdateDto } from '~/modules/auth/dto/account.dto'
import { RegisterDto } from '~/modules/auth/dto/auth.dto'

import { md5, randomValue } from '~/utils'
import { UserStatus } from './constant'
import { PasswordUpdateDto } from './dto/password.dto'
import { UserDto, UserQueryDto, UserUpdateDto } from './dto/user.dto'
import { AccountInfo } from './user.model'
import { PrismaService } from 'nestjs-prisma'
import { User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    private prisma: PrismaService
  ) {}

  async findUserById(id: number): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { id, status: UserStatus.Enabled }
    })
  }

  async findUserByUserName(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        username,
        status: UserStatus.Enabled
      }
    })
  }

  /**
   * 获取用户信息
   * @param uid user id
   */
  async getAccountInfo(uid: number): Promise<AccountInfo> {
    const user = await this.prisma.user.findUnique({
      where: { id: uid }
    })
    if (isEmpty(user)) throw new BusinessException(ErrorEnum.USER_NOT_FOUND)
    delete user?.salt
    delete user?.password
    return user
  }

  /**
   * 更新个人信息
   */
  async updateAccountInfo(uid: number, info: AccountUpdateDto): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: uid } })
    if (isEmpty(user)) throw new BusinessException(ErrorEnum.USER_NOT_FOUND)

    const data = {
      ...(info.nickname ? { nickname: info.nickname } : null),
      ...(info.remark ? { remark: info.remark } : null)
    }
    await this.prisma.user.update({ where: { id: uid }, data })
  }

  /**
   * 更改密码
   */
  async updatePassword(uid: number, dto: PasswordUpdateDto): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: uid } })
    if (isEmpty(user)) throw new BusinessException(ErrorEnum.USER_NOT_FOUND)

    const comparePassword = md5(`${dto.oldPassword}${user.salt}`)
    // 原密码不一致，不允许更改
    if (user.password !== comparePassword) throw new BusinessException(ErrorEnum.PASSWORD_MISMATCH)
    const password = md5(`${dto.newPassword}${user.salt}`)
    await this.prisma.user.update({ where: { id: uid }, data: { password } })
    await this.upgradePasswordV(user.id)
  }

  /**
   * 直接更改密码
   */
  async forceUpdatePassword(uid: number, password: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: uid
      }
    })

    const newPassword = md5(`${password}${user.salt}`)
    await this.prisma.user.update({
      where: { id: uid },
      data: { password: newPassword }
    })
    await this.upgradePasswordV(user.id)
  }

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   */
  async create({ username, password, roleIds, deptId, ...data }: UserDto): Promise<void> {
    const exists = await this.prisma.user.findUnique({ where: { username } })
    if (!isEmpty(exists)) throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)
    const salt = randomValue(32)
    if (!password) {
      password = md5(`123456${salt}`)
    } else {
      password = md5(`${password ?? '123456'}${salt}`)
    }
    await this.prisma.user.create({
      data: {
        username,
        password,
        salt,
        ...data,
        roles: {
          connect: roleIds.map((id) => ({ id }))
        },
        deptId
      }
    })
  }

  /**
   * 更新用户信息
   */
  async update(
    id: number,
    { password, deptId, roleIds, status, ...data }: UserUpdateDto
  ): Promise<void> {
    if (password) await this.forceUpdatePassword(id, password)
    await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        status,
        roles: {
          set: roleIds.map((id) => ({ id }))
        },
        deptId
      }
    })
    if (status === 0) {
      // 禁用状态
      await this.forbidden(id)
    }
  }

  /**
   * 查找用户信息
   * @param id 用户id
   */
  async info(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        roles: true,
        dept: true
      }
    })

    delete user.password
    delete user.salt
    return user
  }

  /**
   * 根据ID列表删除用户
   */
  async delete(userIds: number[]): Promise<void | never> {
    const rootUserId = await this.findRootUserId()
    if (userIds.includes(rootUserId)) throw new BadRequestException('不能删除root用户!')
    await this.prisma.user.deleteMany({
      where: {
        id: {
          in: userIds
        }
      }
    })
  }

  /**
   * 查找超管的用户ID
   */
  async findRootUserId(): Promise<number> {
    const user = await this.prisma.user.findFirst({
      where: {
        roles: {
          some: {
            id: ROOT_ROLE_ID
          }
        }
      }
    })
    return user.id
  }

  /**
   * 查询用户列表
   */

  async list({
    current,
    pageSize,
    username,
    nickname,
    deptId,
    status
  }: UserQueryDto): Promise<any> {
    const query = {
      where: {
        username: { contains: username },
        nickname: { contains: nickname },
        status: status && +status,
        deptId: deptId && +deptId
      },
      skip: (+current - 1) * +pageSize,
      take: +pageSize
    }
    const [list, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        ...query,
        include: {
          dept: true,
          roles: true
        }
      }),
      this.prisma.user.count(query)
    ])

    return {
      list,
      pagination: {
        total,
        currentPage: current,
        pageSize
      }
    }
  }

  /**
   * 禁用用户
   */
  async forbidden(uid: number, accessToken?: string): Promise<void> {
    await this.redis.del(genAuthPVKey(uid))
    await this.redis.del(genAuthTokenKey(uid))
    await this.redis.del(genAuthPermKey(uid))
    if (accessToken) {
      const token = await this.prisma.accessToken.findUnique({
        where: { value: accessToken }
      })
      this.redis.del(genOnlineUserKey(token.id))
    }
  }

  /**
   * 禁用多个用户
   */
  async multiForbidden(uids: number[]): Promise<void> {
    if (uids) {
      const pvs: string[] = []
      const ts: string[] = []
      const ps: string[] = []
      uids.forEach((uid) => {
        pvs.push(genAuthPVKey(uid))
        ts.push(genAuthTokenKey(uid))
        ps.push(genAuthPermKey(uid))
      })
      await this.redis.del(pvs)
      await this.redis.del(ts)
      await this.redis.del(ps)
    }
  }

  /**
   * 升级用户版本密码
   */
  async upgradePasswordV(id: number): Promise<void> {
    // admin:passwordVersion:${param.id}
    const v = await this.redis.get(genAuthPVKey(id))
    if (!isEmpty(v)) await this.redis.set(genAuthPVKey(id), Number.parseInt(v) + 1)
  }

  /**
   * 判断用户名是否存在
   */
  async exist(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } })
    if (isNil(user)) throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)

    return true
  }

  /**
   * 注册
   */
  async register({ username, ...data }: RegisterDto): Promise<User> {
    const exists = await this.prisma.user.findUnique({ where: { username } })
    if (!isEmpty(exists)) throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)

    const salt = randomValue(32)

    const password = md5(`${data.password ?? 'a123456'}${salt}`)
    return this.prisma.user.create({
      data: {
        username,
        password,
        status: 1,
        salt: salt
      }
    })
  }
}
