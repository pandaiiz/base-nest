import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/pagination'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { CustomerDto, CustomerQueryDto } from './customer.dto'
import { CustomerService } from './customer.service'
import { Customer } from '@prisma/client'
import { generateQueryFilter } from '~/utils/generateQueryFilter.util'

export const permissions = definePermission('relationship:customer', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const)

@ApiTags('Relationship - 关系类型模块')
@ApiSecurityAuth()
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: '获取客户列表' })
  @Perm(permissions.LIST)
  async list(@Query() query: CustomerQueryDto): Promise<Pagination<Customer> | Customer[]> {
    const filterConfig = { contains: ['name', 'code'] }
    const filter = generateQueryFilter(filterConfig, query)
    return this.customerService.page(filter)
  }

  @Post()
  @ApiOperation({ summary: '新增客户' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: Customer): Promise<void> {
    await this.customerService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询客户' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<Customer> {
    return this.customerService.findOne(id)
  }

  @Post(':id')
  @ApiOperation({ summary: '更新客户' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: CustomerDto): Promise<void> {
    await this.customerService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除客户' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.customerService.delete(id)
  }
}
