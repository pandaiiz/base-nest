import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { DeptDto, DeptQueryDto } from './dept.dto'
import { DeptService } from './dept.service'
import { Dept } from '@prisma/client'
import { Pagination } from '~/helper/pagination'
import { generateQueryFilter } from '~/utils/generateQueryFilter.util'

export const permissions = definePermission('system:dept', {
  QUERY: 'query',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const)

@ApiSecurityAuth()
@ApiTags('System - 部门模块')
@Controller('depts')
export class DeptController {
  constructor(private deptService: DeptService) {}

  @Get()
  @ApiOperation({ summary: '获取部门列表' })
  // @Perm(permissions.QUERY)
  async list(@Query() query: DeptQueryDto): Promise<Pagination<Dept> | Dept[]> {
    const filterConfig = { contains: ['name'], equals: ['useKnifeTool'] }
    const filter = generateQueryFilter(filterConfig, query)
    return this.deptService.page(filter)
  }

  @Post()
  @ApiOperation({ summary: '创建部门' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: Dept): Promise<void> {
    await this.deptService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询部门信息' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<Dept> {
    return this.deptService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新部门' })
  @Perm(permissions.UPDATE)
  async update(
    @IdParam() id: number,
    @Body()
    updateDeptDto: DeptDto
  ): Promise<void> {
    await this.deptService.update(id, updateDeptDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除部门' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    // 查询是否有关联用户或者部门，如果含有则无法删除
    const count = await this.deptService.countUserByDeptId(id)
    if (count > 0) throw new BusinessException(ErrorEnum.DEPARTMENT_HAS_ASSOCIATED_USERS)
    await this.deptService.delete(id)
  }
}
