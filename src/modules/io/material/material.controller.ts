import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/pagination'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { MaterialDto, MaterialQueryDto } from './material.dto'
import { MaterialService } from './material.service'
import { Material } from '@prisma/client'
import { generateQueryFilter } from '~/utils/generateQueryFilter.util'

export const permissions = definePermission('relationship:material', {
  QUERY: 'query',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const)

@ApiTags('Relationship - 物料管理模块')
@ApiSecurityAuth()
@Controller('material')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  @Get()
  @ApiOperation({ summary: '获取客户列表' })
  @Perm(permissions.QUERY)
  async list(@Query() query: MaterialQueryDto): Promise<Pagination<Material> | Material[]> {
    const filterConfig = { contains: ['name', 'code'] }
    const filter = generateQueryFilter(filterConfig, query)
    return this.materialService.page(filter)
  }

  @Post()
  @ApiOperation({ summary: '新增客户' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: Material): Promise<void> {
    await this.materialService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询客户' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<Material> {
    return this.materialService.findOne(id)
  }

  @Post(':id')
  @ApiOperation({ summary: '更新客户' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: MaterialDto): Promise<void> {
    await this.materialService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除客户' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.materialService.delete(id)
  }
}
