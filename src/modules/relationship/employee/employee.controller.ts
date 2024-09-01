import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/pagination'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { EmployeeDto, EmployeeQueryDto } from './employee.dto'
import { EmployeeService } from './employee.service'
import { Employee } from '@prisma/client'
import { generateQueryFilter } from '~/utils/generateQueryFilter.util'

export const permissions = definePermission('relationship:employee', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const)

@ApiTags('Relationship - 员工管理模块')
@ApiSecurityAuth()
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({ summary: '获取员工列表' })
  @Perm(permissions.LIST)
  async list(@Query() query: EmployeeQueryDto): Promise<Pagination<Employee> | Employee[]> {
    const filterConfig = { contains: ['name', 'code'] }
    const filter = generateQueryFilter(filterConfig, query)
    return this.employeeService.page(filter)
  }

  @Get('all')
  @ApiOperation({ summary: '获取员工列表' })
  @Perm(permissions.LIST)
  async allList(): Promise<Employee[]> {
    return this.employeeService.findAll()
  }

  @Post()
  @ApiOperation({ summary: '新增员工' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: Employee): Promise<void> {
    await this.employeeService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询员工' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<Employee> {
    return this.employeeService.findOne(id)
  }

  @Post(':id')
  @ApiOperation({ summary: '更新员工' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: EmployeeDto): Promise<void> {
    await this.employeeService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除员工' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.employeeService.delete(id)
  }
}
