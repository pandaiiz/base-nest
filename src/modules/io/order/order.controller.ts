import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { IoOrderService } from './order.service'
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { ioOrder } from '@prisma/client'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { Pagination } from '~/helper/pagination'
import { generateQueryFilter } from '~/utils/generateQueryFilter.util'
import { IoOrderDto, IoOrderQueryDto } from './order.dto'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'

export const permissions = definePermission('io:order', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
} as const)

@ApiTags('io - 收发单列表')
@ApiSecurityAuth()
@Controller('io/order')
export class IoOrderController {
  constructor(private readonly ioOrderService: IoOrderService) {}

  @Get()
  @ApiOperation({ summary: '获取收发单列表' })
  @Perm(permissions.LIST)
  async list(@Query() query: IoOrderQueryDto): Promise<Pagination<ioOrder> | ioOrder[]> {
    const filterConfig = { contains: ['orderNumber'] }
    const filter = generateQueryFilter(filterConfig, query)
    return this.ioOrderService.page(filter)
  }

  @Post()
  @ApiOperation({ summary: '新增收发单' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: ioOrder, @AuthUser() user: IAuthUser): Promise<void> {
    await this.ioOrderService.create1(dto, user)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询收发单' })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<ioOrder> {
    return this.ioOrderService.findOne(id)
  }

  @Post(':id')
  @ApiOperation({ summary: '更新收发单' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: IoOrderDto): Promise<void> {
    await this.ioOrderService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除收发单' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.ioOrderService.delete(id)
  }
}
