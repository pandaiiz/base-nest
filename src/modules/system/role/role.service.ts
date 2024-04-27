import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { isEmpty } from 'lodash'
import { EntityManager, In, Repository } from 'typeorm'

import { PagerDto } from '~/common/dto/pager.dto'
import { ROOT_ROLE_ID } from '~/constants/system.constant'
// import { paginate } from '~/helper/paginate'
// import { Pagination } from '~/helper/paginate/pagination'
import { MenuEntity } from '~/modules/system/menu/menu.entity'
import { RoleEntity } from '~/modules/system/role/role.entity'

import { RoleDto, RoleUpdateDto } from './role.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
    private prisma: PrismaService
  ) {}

  /**
   * 列举所有角色：除去超级管理员
   */
  async findAll({ page, pageSize }: PagerDto): Promise<any> {
    return this.prisma.role.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize
    })
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
  async create({ menuIds, ...data }: RoleDto): Promise<{ roleId: number }> {
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
  async update(id, { menuIds, ...data }: RoleUpdateDto): Promise<void> {
    console.log(
      'menuIds',
      menuIds,
      menuIds.map((menuId) => ({ id: menuId }))
    )
    await this.prisma.role.update({
      where: { id },
      data: {
        ...data,
        menus: {
          connect: menuIds.map((menuId) => ({ id: menuId }))
        }
      }
    })
    // await this.roleRepository.update(id, data)

    if (!isEmpty(menuIds)) {
      // using transaction
      await this.entityManager.transaction(async (manager) => {
        const menus = await this.menuRepository.find({
          where: { id: In(menuIds) }
        })

        const role = await this.roleRepository.findOne({ where: { id } })
        role.menus = menus
        await manager.save(role)
      })
    }
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

  async isAdminRoleByUser(uid: number): Promise<boolean> {
    const roles = await this.roleRepository.find({
      where: {
        users: { id: uid }
      }
    })

    if (!isEmpty(roles)) {
      return roles.some((r) => r.id === ROOT_ROLE_ID)
    }
    return false
  }

  hasAdminRole(rids: number[]): boolean {
    return rids.includes(ROOT_ROLE_ID)
  }

  /**
   * 根据角色ID查找是否有关联用户
   */
  async checkUserByRoleId(id: number): Promise<boolean> {
    return this.roleRepository.exist({
      where: {
        users: {
          roles: { id }
        }
      }
    })
  }
}
