import { Injectable } from '@nestjs/common'
import { isEmpty } from 'lodash'
import { ROOT_ROLE_ID } from '~/constants/system.constant'

import { RoleCreateDto, RoleUpdateDto } from './role.dto'
import { PrismaService } from 'nestjs-prisma'
import { Pagination } from '~/helper/pagination'
import { Role } from '@prisma/client'

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  /**
   * 列举所有角色：除去超级管理员
   */
  async page(query: any): Promise<Pagination<Role> | Role[]> {
    const { current, pageSize, where } = query
    if (+pageSize === -1) {
      return this.prisma.role.findMany({
        where: { id: { not: ROOT_ROLE_ID } }
      })
    }

    const skip = (+current - 1) * +pageSize
    const take = +pageSize
    const [data, total] = await this.prisma.$transaction([
      this.prisma.role.findMany({ skip, take, where }),
      this.prisma.role.count()
    ])
    return new Pagination<Role>(data, total, current, pageSize)
  }

  /**
   * 根据角色获取角色信息
   */
  async info(id: number) {
    const role = await this.prisma.role.findUnique({
      where: {
        id
      },
      include: {
        menus: {
          select: {
            id: true
          }
        }
      }
    })
    const menuIds = role.menus.map((m) => m.id)
    delete role.menus
    return { ...role, menuIds }
  }

  async delete(id: number): Promise<void> {
    if (id === ROOT_ROLE_ID) throw new Error('不能删除超级管理员')
    await this.prisma.role.delete({ where: { id } })
  }

  /**
   * 增加角色
   */
  async create({ menuIds, ...data }: RoleCreateDto): Promise<{ roleId: number }> {
    const role = await this.prisma.role.create({
      data: {
        ...data,
        menus: {
          connect: menuIds.map((id) => ({ id }))
        }
      }
    })
    return { roleId: role.id }
  }

  /**
   * 更新角色信息
   */
  async update(id: number, { menuIds, ...data }: RoleUpdateDto): Promise<void> {
    await this.prisma.role.update({
      where: { id },
      data: {
        ...data,
        menus: {
          set: menuIds.map((menuId) => ({ id: menuId }))
        }
      }
    })
  }

  /**
   * 根据用户id查找角色信息
   */
  async getRoleIdsByUser(id: number): Promise<number[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        users: {
          some: {
            id
          }
        }
      }
    })
    if (!isEmpty(roles)) return roles.map((r) => r.id)
    return []
  }

  async getRoleValues(ids: number[]): Promise<string[]> {
    return (
      await this.prisma.role.findMany({
        where: {
          id: {
            in: ids
          }
        }
      })
    ).map((r) => r.value)
  }

  /* async isAdminRoleByUser(uid: number): Promise<boolean> {
    const roles = await this.roleRepository.find({
      where: {
        users: { id: uid }
      }
    })

    if (!isEmpty(roles)) {
      return roles.some((r) => r.id === ROOT_ROLE_ID)
    }
    return false
  } */

  hasAdminRole(rids: number[]): boolean {
    return rids.includes(ROOT_ROLE_ID)
  }

  /**
   * 根据角色ID查找是否有关联用户
   */
  async checkUserByRoleId(id: number): Promise<boolean> {
    const { users } = await this.prisma.role.findUnique({
      where: {
        id
      },
      include: {
        users: true
      }
    })
    return users.length > 0
  }
}
