import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/pagination'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { DictTypeDto, DictTypeQueryDto } from './dict-type.dto'
import { DictTypeService } from './dict-type.service'
import { DictType } from '@prisma/client'
import { generateQueryFilter } from '~/utils/generateQueryFilter.util'

export const permissions = definePermission('system:dict-type', {
  QUERY: 'query',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const)

@ApiTags('System - 字典类型模块')
@ApiSecurityAuth()
@Controller('dict-type')
export class DictTypeController {
  constructor(private dictTypeService: DictTypeService) {}

  @Get()
  @ApiOperation({ summary: '获取字典类型列表' })
  @Perm(permissions.QUERY)
  async list(@Query() query: DictTypeQueryDto): Promise<Pagination<DictType> | DictType[]> {
    const filterConfig = { contains: ['name', 'code'] }
    const filter = generateQueryFilter(filterConfig, query)
    return this.dictTypeService.page(filter)
  }

  @Get('select-options')
  @ApiOperation({ summary: '一次性获取所有的字典类型(不分页)' })
  @Perm(permissions.QUERY)
  async getAll(): Promise<DictType[]> {
    return this.dictTypeService.findAll()
  }

  @Post()
  @ApiOperation({ summary: '新增字典类型' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: DictType): Promise<void> {
    await this.dictTypeService.isExistKey(dto.label)
    await this.dictTypeService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询字典类型信息' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<DictType> {
    return this.dictTypeService.findOne(id)
  }

  @Post(':id')
  @ApiOperation({ summary: '更新字典类型' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: DictTypeDto): Promise<void> {
    await this.dictTypeService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定的字典类型' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.dictTypeService.delete(id)
  }
}
