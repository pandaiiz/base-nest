import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { DictItemQueryDto } from './dict-item.dto'
import { DictItemService } from './dict-item.service'
import { DictItem } from '@prisma/client'
import { Pagination } from '~/helper/pagination'
import { generateQueryFilter } from '~/utils/generateQueryFilter.util'

export const permissions = definePermission('system:dict-item', {
  QUERY: 'query',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const)

@ApiTags('System - 字典项模块')
@ApiSecurityAuth()
@Controller('dict-item')
export class DictItemController {
  constructor(private dictItemService: DictItemService) {}

  @Get()
  @ApiOperation({ summary: '获取字典项列表' })
  @Perm(permissions.QUERY)
  async list(@Query() query: DictItemQueryDto): Promise<Pagination<DictItem> | DictItem[]> {
    const filterConfig = {
      contains: ['label', 'value'],
      equals: ['typeId'],
      orderBy: 'sort',
      orderType: 'asc'
    }
    const filter = generateQueryFilter(filterConfig, query)
    return this.dictItemService.page(filter)
  }

  @Get('by-dict-code')
  @ApiOperation({ summary: '获取字典项列表' })
  async getDictItemsByDictCode(@Query() query: { dictCode: string }): Promise<DictItem[]> {
    return this.dictItemService.getDictItemsByDictCode(query.dictCode)
  }

  @Post()
  @ApiOperation({ summary: '新增字典项' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: DictItem): Promise<void> {
    await this.dictItemService.isExistKey(dto)
    await this.dictItemService.create(dto)
  }

  @Post('create-by-dict-code')
  @ApiOperation({ summary: '使用字典编码新增字典项' })
  @Perm(permissions.CREATE)
  async createByDictCode(@Body() dto: any): Promise<void> {
    await this.dictItemService.isExistKey(dto)
    await this.dictItemService.createByDictCode(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询字典项信息' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<DictItem> {
    return this.dictItemService.findOne(id)
  }

  @Post(':id')
  @ApiOperation({ summary: '更新字典项' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: DictItem): Promise<void> {
    await this.dictItemService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定的字典项' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.dictItemService.delete(id)
  }
}
