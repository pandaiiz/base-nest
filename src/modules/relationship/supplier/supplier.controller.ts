import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/pagination'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { SupplierDto, SupplierQueryDto } from './supplier.dto'
import { SupplierService } from './supplier.service'
import { Supplier } from '@prisma/client'
import { generateQueryFilter } from '~/utils/generateQueryFilter.util'

export const permissions = definePermission('relationship:supplier', {
  QUERY: 'query',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const)

@ApiTags('Relationship - 关系类型模块')
@ApiSecurityAuth()
@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Get()
  @ApiOperation({ summary: '获取供应商列表' })
  // @Perm(permissions.QUERY)
  async list(@Query() query: SupplierQueryDto): Promise<Pagination<Supplier> | Supplier[]> {
    const filterConfig = { contains: ['name', 'code'] }
    const filter = generateQueryFilter(filterConfig, query)
    return this.supplierService.page(filter)
  }

  @Post()
  @ApiOperation({ summary: '新增供应商' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: Supplier): Promise<void> {
    await this.supplierService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询供应商' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<Supplier> {
    return this.supplierService.findOne(id)
  }

  @Post(':id')
  @ApiOperation({ summary: '更新供应商' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: SupplierDto): Promise<void> {
    await this.supplierService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除供应商' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.supplierService.delete(id)
  }
}
