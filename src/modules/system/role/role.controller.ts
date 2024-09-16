import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { MenuService } from '../menu/menu.service'

import { RoleCreateDto, RoleQueryDto, RoleUpdateDto } from './role.dto'
import { RoleService } from './role.service'
import { generateQueryFilter } from '~/utils/generateQueryFilter.util'

export const permissions = definePermission('system:role', {
  QUERY: 'query',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const)

@ApiTags('System - 角色模块')
@ApiSecurityAuth()
@Controller('roles')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private menuService: MenuService
  ) {}

  @Get()
  @ApiOperation({ summary: '获取角色列表' })
  @Perm(permissions.QUERY)
  async list(@Query() query: RoleQueryDto) {
    const filterConfig = { contains: ['name', 'value'], equals: ['status'] }
    const filter = generateQueryFilter(filterConfig, query)
    return this.roleService.page(filter)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取角色信息' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number) {
    return this.roleService.info(id)
  }

  @Post()
  @ApiOperation({ summary: '新增角色' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: RoleCreateDto): Promise<void> {
    await this.roleService.create(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新角色' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: RoleUpdateDto): Promise<void> {
    await this.roleService.update(id, dto)
    await this.menuService.refreshOnlineUserPerms()
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    if (await this.roleService.checkUserByRoleId(id))
      throw new BadRequestException('该角色存在关联用户，无法删除')

    await this.roleService.delete(id)
    await this.menuService.refreshOnlineUserPerms()
  }
}
