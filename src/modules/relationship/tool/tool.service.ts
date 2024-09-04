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
    const { current, pageSize, supplierId, code, receiverId, startTime, endTime } = query
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
        where: {
          supplierId,
          code,
          receiverId,
          createdAt: {
            gte: startTime,
            lte: endTime
          }
        },
        include: {
          supplier: true,
          receiver: true,
          creator: true
        },
        orderBy: {
          createdAt: 'desc'
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

  async getReport() {
    // 收发报表
    const inOutReportGroup = await this.prisma.tool.groupBy({
      by: ['code', 'name', 'supplierId', 'operationType'],
      _sum: {
        quantity: true
      },
      where: {
        operationType: {
          in: [1, 2]
        }
      }
    })

    // 车间报表
    const workshopReportGroup = await this.prisma.tool.groupBy({
      by: ['code', 'name', 'receiverId', 'operationType'],
      _sum: {
        quantity: true
      },
      where: {
        operationType: {
          in: [11, 12]
        }
      }
    })
    // 修磨报表
    const fixReportGroup = await this.prisma.tool.groupBy({
      by: ['code', 'name', 'supplierId', 'operationType'],
      _sum: {
        quantity: true
      },
      where: {
        operationType: {
          in: [21, 22]
        }
      }
    })
    // 获取所有涉及的supplierId
    const supplierIds = [...new Set(inOutReportGroup.map((item) => item.supplierId))]
    const receiverIds = [...new Set(workshopReportGroup.map((item) => item.receiverId))]

    // 查询这些supplier的信息
    const suppliers = await this.prisma.supplier.findMany({
      where: {
        id: {
          in: supplierIds
        }
      },
      select: {
        id: true,
        name: true // 假设我们需要supplier的名称，根据实际需求调整
      }
    })
    // 查询这些supplier的信息
    const receivers = await this.prisma.employee.findMany({
      where: {
        id: {
          in: receiverIds
        }
      },
      select: {
        id: true,
        name: true // 假设我们需要supplier的名称，根据实际需求调整
      }
    })

    // 创建一个supplierId到supplier对象的映射
    const supplierMap = new Map(suppliers.map((s) => [s.id, s]))
    const receiverMap = new Map(receivers.map((s) => [s.id, s]))

    // 组合结果
    const inOutReport = Object.values(
      inOutReportGroup.reduce((acc, item) => {
        const supplierKey = item.supplierId
        const codeKey = item.code

        if (!acc[codeKey]) {
          acc[codeKey] = {
            name: item.name,
            suppliers: {}
          }
        }

        if (!acc[codeKey].suppliers[supplierKey]) {
          acc[codeKey].suppliers[supplierKey] = {
            supplier: supplierMap.get(item.supplierId).name,
            inQuantity: 0,
            outQuantity: 0
          }
        }
        if (item.operationType === 1) {
          acc[codeKey].suppliers[supplierKey].inQuantity = item._sum.quantity
        } else {
          acc[codeKey].suppliers[supplierKey].outQuantity = item._sum.quantity
        }

        return acc
      }, {})
    )
    // 将items对象转换为数组
    inOutReport.forEach((report: any) => {
      report.suppliers = Object.values(report.suppliers)
    })

    const workshopReport = Object.values(
      workshopReportGroup.reduce((acc, item) => {
        const receiverKey = item.receiverId
        const codeKey = item.code

        if (!acc[receiverKey]) {
          acc[receiverKey] = {
            receiver: receiverMap.get(item.receiverId).name,
            items: {}
          }
        }

        if (!acc[receiverKey].items[codeKey]) {
          acc[receiverKey].items[codeKey] = {
            code: item.code,
            name: item.name,
            inQuantity: 0,
            outQuantity: 0
          }
        }
        if (item.operationType === 12) {
          acc[receiverKey].items[codeKey].inQuantity = item._sum.quantity
        } else {
          acc[receiverKey].items[codeKey].outQuantity = item._sum.quantity
        }

        return acc
      }, {})
    )
    // 将items对象转换为数组
    workshopReport.forEach((report: any) => {
      report.items = Object.values(report.items)
    })

    const fixReport = Object.values(
      fixReportGroup.reduce((acc, item) => {
        const supplierKey = item.supplierId
        const codeKey = item.code

        if (!acc[supplierKey]) {
          acc[supplierKey] = {
            supplier: supplierMap.get(item.supplierId).name,
            items: {}
          }
        }

        if (!acc[supplierKey].items[codeKey]) {
          acc[supplierKey].items[codeKey] = {
            code: item.code,
            name: item.name,
            inQuantity: 0,
            outQuantity: 0
          }
        }
        if (item.operationType === 22) {
          acc[supplierKey].items[codeKey].inQuantity = item._sum.quantity
        } else {
          acc[supplierKey].items[codeKey].outQuantity = item._sum.quantity
        }

        return acc
      }, {})
    )
    // 将items对象转换为数组
    fixReport.forEach((report: any) => {
      report.items = Object.values(report.items)
    })

    return { inOutReport, fixReport, workshopReport }
  }
}
