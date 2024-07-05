import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { concat, isEmpty, uniq } from 'lodash'

import { BusinessException } from '~/common/exceptions/biz.exception'
import { RedisKeys } from '~/constants/cache.constant'
import { ErrorEnum } from '~/constants/error-code.constant'
import { genAuthPermKey, genAuthTokenKey } from '~/helper/genRedisKey'
import { SseService } from '~/modules/sse/sse.service'

import { deleteEmptyChildren, generatorMenu, generatorRouters } from '~/utils'

import { RoleService } from '../role/role.service'

import { MenuDto, MenuQueryDto } from './menu.dto'
import { PrismaService } from 'nestjs-prisma'
import { Menu } from '@prisma/client'

@Injectable()
export class MenuService {
  constructor(
    @InjectRedis() private redis: Redis,
    private roleService: RoleService,
    private sseService: SseService,
    private prisma: PrismaService
  ) {}

  /**
   * 获取所有菜单以及权限
   */
  async list({ name, path, permission, component, status }: MenuQueryDto): Promise<any[]> {
    const menus = await this.prisma.menu.findMany({
      where: {
        ...(name && { name: { contains: name } }),
        ...(path && { path: { contains: path } }),
        ...(permission && { permission: { contains: permission } }),
        ...(component && { component: { contains: component } }),
        ...(status && { status })
      },
      orderBy: {
        sort: 'asc'
      }
    })
    const menuList = generatorMenu(menus)

    if (!isEmpty(menuList)) {
      deleteEmptyChildren(menuList)
      return menuList
    }
    // 如果生产树形结构为空，则返回原始菜单列表
    return menus
  }

  async create(menu: any): Promise<void> {
    const result = await this.prisma.menu.create({
      data: menu
    })
    await this.sseService.noticeClientToUpdateMenusByMenuIds([result.id])
  }

  async update(id: number, data: any): Promise<void> {
    await this.prisma.menu.update({
      where: { id },
      data
    })
    await this.sseService.noticeClientToUpdateMenusByMenuIds([id])
  }

  /**
   * 根据角色获取所有菜单
   */
  async getMenus(uid: number) {
    const roleIds = await this.roleService.getRoleIdsByUser(uid)
    let menus: Menu[] = []

    if (isEmpty(roleIds)) return generatorRouters([])

    if (this.roleService.hasAdminRole(roleIds)) {
      menus = await this.prisma.menu.findMany({
        orderBy: {
          sort: 'asc'
        }
      })
    } else {
      menus = await this.prisma.menu.findMany({
        where: {
          roles: {
            some: {
              id: { in: roleIds }
            }
          }
        }
      })
    }
    return generatorRouters(menus)
  }

  /**
   * 检查菜单创建规则是否符合
   */
  async check(dto: Partial<MenuDto>): Promise<void | never> {
    if (dto.type === 'ACCESS' && !dto.parentId) {
      // 无法直接创建权限，必须有parent
      throw new BusinessException(ErrorEnum.PERMISSION_REQUIRES_PARENT)
    }
    if (dto.type === 'MENU' && dto.parentId) {
      const parent = await this.getMenuItemInfo(dto.parentId)
      if (isEmpty(parent)) throw new BusinessException(ErrorEnum.PARENT_MENU_NOT_FOUND)

      if (parent && parent.type === 1) {
        // 当前新增为菜单但父节点也为菜单时为非法操作
        throw new BusinessException(ErrorEnum.ILLEGAL_OPERATION_DIRECTORY_PARENT)
      }
    }
  }

  /**
   * 查找当前菜单下的子菜单，目录以及菜单
   */
  async findChildMenus(mid: number): Promise<any> {
    const allMenus: any = []
    const menus = await this.prisma.menu.findMany({
      where: {
        parentId: mid
      }
    })
    // if (_.isEmpty(menus)) {
    //   return allMenus;
    // }
    // const childMenus: any = [];
    for (const menu of menus) {
      if (menu.type !== 'ACCESS') {
        // 子目录下是菜单或目录，继续往下级查找
        const c = await this.findChildMenus(menu.id)
        allMenus.push(c)
      }
      allMenus.push(menu.id)
    }
    return allMenus
  }

  /**
   * 获取某个菜单的信息
   * @param mid menu id
   */
  async getMenuItemInfo(mid: number): Promise<any> {
    return this.prisma.menu.findUnique({ where: { id: mid } })
  }

  /**
   * 获取某个菜单以及关联的父菜单的信息
   */
  async getMenuItemAndParentInfo(mid: number) {
    const menu = await this.prisma.menu.findUnique({ where: { id: mid } })
    let parentMenu: any | undefined
    if (menu && menu.parentId)
      parentMenu = await this.prisma.menu.findUnique({ where: { id: menu.parentId } })

    return { menu, parentMenu }
  }

  /**
   * 查找节点路由是否存在
   */
  async findRouterExist(path: string): Promise<boolean> {
    const menus = await this.prisma.menu.findMany({ where: { path } })
    return !isEmpty(menus)
  }

  /**
   * 获取当前用户的所有权限
   */
  async getPermissions(uid: number): Promise<string[]> {
    const roleIds = await this.roleService.getRoleIdsByUser(uid)
    let permission: any[] = []
    let result: any = null
    if (this.roleService.hasAdminRole(roleIds)) {
      result = await this.prisma.menu.findMany({
        where: {
          permission: {
            not: null
          },
          type: {
            in: ['CATALOG', 'ACCESS']
          }
        }
      })
    } else {
      if (isEmpty(roleIds)) return permission
      result = await this.prisma.menu.findMany({
        where: {
          roles: {
            some: {
              id: {
                in: roleIds
              }
            }
          },
          type: {
            in: ['CATALOG', 'ACCESS']
          },
          permission: {
            not: null
          }
        }
      })
    }
    if (!isEmpty(result)) {
      result.forEach((e: { permission: string }) => {
        if (e.permission) permission = concat(permission, e.permission.split(','))
      })
      permission = uniq(permission)
    }
    return permission
  }

  /**
   * 删除多项菜单
   */
  async deleteMenuItem(mids: number[]): Promise<void> {
    await this.prisma.menu.deleteMany({
      where: { id: { in: mids } }
    })
  }

  /**
   * 刷新指定用户ID的权限
   */
  async refreshPerms(uid: number): Promise<void> {
    const perms = await this.getPermissions(uid)
    const online = await this.redis.get(genAuthTokenKey(uid))
    if (online) {
      // 判断是否在线
      await this.redis.set(genAuthPermKey(uid), JSON.stringify(perms))
      await this.sseService.noticeClientToUpdateMenusByUserIds([uid])
    }
  }

  /**
   * 刷新所有在线用户的权限
   */
  async refreshOnlineUserPerms(): Promise<void> {
    const onlineUserIds: string[] = await this.redis.keys(genAuthTokenKey('*'))
    if (onlineUserIds && onlineUserIds.length > 0) {
      const promiseArr = onlineUserIds
        .map((i) => Number.parseInt(i.split(RedisKeys.AUTH_TOKEN_PREFIX)[1]))
        .filter((i) => i)
        .map(async (uid) => {
          const perms = await this.getPermissions(uid)
          await this.redis.set(genAuthPermKey(uid), JSON.stringify(perms))
          return uid
        })
      const uids = await Promise.all(promiseArr)
      this.sseService.noticeClientToUpdateMenusByUserIds(uids)
    }
  }

  /**
   * 根据菜单ID查找是否有关联角色
   */
  async checkRoleByMenuId(id: number): Promise<boolean> {
    const { roles } = await this.prisma.menu.findUnique({ where: { id }, include: { roles: true } })
    return roles.length > 0
  }
}
