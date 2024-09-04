import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/pagination'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { ToolDto, ToolQueryDto } from './tool.dto'
import { ToolService } from './tool.service'
import { Tool } from '@prisma/client'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'

export const permissions = definePermission('relationship:tool', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const)

@ApiTags('Relationship - 刀具管理模块')
@ApiSecurityAuth()
@Controller('tool')
export class ToolController {
  constructor(private toolService: ToolService) {}

  @Get()
  @ApiOperation({ summary: '获取刀具记录列表' })
  @Perm(permissions.LIST)
  async list(@Query() query: ToolQueryDto): Promise<Pagination<Tool> | Tool[]> {
    return this.toolService.page(query)
  }

  @Post()
  @ApiOperation({ summary: '新增刀具记录' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: Tool, @AuthUser() user: IAuthUser): Promise<void> {
    console.log(user)
    await this.toolService.create({ ...dto, creatorId: user.uid })
  }

  @Get(':id')
  @ApiOperation({ summary: '查询刀具记录' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<Tool> {
    return this.toolService.findOne(id)
  }

  @Post(':id')
  @ApiOperation({ summary: '更新刀具记录' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: ToolDto): Promise<void> {
    await this.toolService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除刀具记录' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.toolService.delete(id)
  }

  @Get('report')
  @ApiOperation({ summary: '查询刀具记录' })
  @Perm(permissions.READ)
  async getReport(): Promise<any> {
    return this.toolService.getReport()
  }
}
