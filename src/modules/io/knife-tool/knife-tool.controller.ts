import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/pagination'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { KnifeToolDto, KnifeToolQueryDto } from './knife-tool.dto'
import { KnifeToolService } from './knife-tool.service'
import { KnifeTool } from '@prisma/client'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'

export const permissions = definePermission('io:knife-tool', {
  QUERY: 'query',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  REPORT: 'report'
} as const)

@ApiTags('IO - 刀具管理模块')
@ApiSecurityAuth()
@Controller('knife-tool')
export class KnifeToolController {
  constructor(private knifeToolService: KnifeToolService) {}

  @Get()
  @ApiOperation({ summary: '获取刀具记录列表' })
  @Perm(permissions.QUERY)
  async list(@Query() query: KnifeToolQueryDto): Promise<Pagination<KnifeTool> | KnifeTool[]> {
    return this.knifeToolService.page(query)
  }

  @Post()
  @ApiOperation({ summary: '新增刀具记录' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: KnifeTool, @AuthUser() user: IAuthUser): Promise<void> {
    console.log(user)
    await this.knifeToolService.create({ ...dto, creatorId: user.uid })
  }

  @Get(':id')
  @ApiOperation({ summary: '查询刀具记录' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<KnifeTool> {
    return this.knifeToolService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新刀具记录' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: KnifeToolDto): Promise<void> {
    console.log(id, dto)
    await this.knifeToolService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除刀具记录' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.knifeToolService.delete(id)
  }

  @Get('report/:type')
  @ApiOperation({ summary: '刀具报表' })
  @Perm(permissions.REPORT)
  async getReport(
    @Query() query: { startTime?: string; endTime?: string },
    @Param('type') type: string
  ): Promise<any> {
    if (type === 'dept') return this.knifeToolService.getDeptReport()
    if (type === 'supplier') return this.knifeToolService.getSupplierReport()
    if (type === 'polish') return this.knifeToolService.getPolishReport()
    // return this.knifeToolService.getReport({ startTime: query.startTime, endTime: query.endTime })
  }
}
