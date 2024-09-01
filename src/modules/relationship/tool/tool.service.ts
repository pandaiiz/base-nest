import { Injectable } from '@nestjs/common'
import { Tool } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CrudService } from '~/helper/crud/crud.service'
import { Pagination } from '~/helper/pagination'
import { ToolQueryDto } from './tool.dto'

@Injectable()
export class ToolService extends CrudService<Tool> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.tool)
  }

  async page(query: ToolQueryDto): Promise<Pagination<Tool> | Tool[]> {
    const { current, pageSize, supplierId, code, receiverId } = query
    const skip = (+current - 1) * +pageSize
    const take = +pageSize
    const groupedQuantities = await this.prisma.tool.groupBy({
      by: ['operationType'],
      _sum: {
        quantity: true
      },
      where: { supplierId, code, receiverId }
    })

    const [data, total] = await this.prisma.$transaction([
      this.prisma.tool.findMany({
        skip,
        take,
        where: { supplierId, code, receiverId },
        include: {
          supplier: true,
          receiver: true,
          creator: true
        }
      }),
      this.prisma.tool.count({ where: { supplierId, code, receiverId } })
    ])
    const summary = groupedQuantities.reduce((acc, item) => {
      acc[item.operationType] = item._sum.quantity
      return acc
    }, {})
    return new Pagination<Tool>(data, total, current, pageSize, summary)
  }
}
