import { Injectable } from '@nestjs/common'
import { KnifeTool } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CrudService } from '~/helper/crud/crud.service'
import { Pagination } from '~/helper/pagination'
import { KnifeToolQueryDto } from './knife-tool.dto'

@Injectable()
export class KnifeToolService extends CrudService<KnifeTool> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.knifeTool)
  }

  async page(query: KnifeToolQueryDto): Promise<Pagination<KnifeTool> | KnifeTool[]> {
    const { current, pageSize, supplierId, code, deptId, startTime, endTime, tableType } = query
    const skip = (+current - 1) * +pageSize
    const take = +pageSize
    const groupedQuantities = await this.prisma.knifeTool.groupBy({
      by: ['operationType'],
      _sum: {
        quantity: true
      },
      where: { supplierId, code, deptId }
    })

    const tableTypeMap = {
      部门: [11, 12],
      厂商: [1, 2],
      修磨: [21, 22],
      报废: [31, 32]
    }
    const tableTypeSchema = tableTypeMap[tableType] || undefined

    const [data, total] = await this.prisma.$transaction([
      this.prisma.knifeTool.findMany({
        skip,
        take,
        where: {
          operationType: {
            in: tableTypeSchema
          },
          supplierId,
          code,
          deptId,
          createdAt: {
            gte: startTime,
            lte: endTime
          }
        },
        include: {
          supplier: true,
          dept: true,
          creator: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.prisma.knifeTool.count({
        where: {
          supplierId,
          code,
          deptId,
          operationType: {
            in: tableTypeSchema
          }
        }
      })
    ])
    const summary = groupedQuantities.reduce((acc, item) => {
      acc[item.operationType] = item._sum.quantity
      return acc
    }, {})
    return new Pagination<KnifeTool>(data, total, current, pageSize, summary)
  }

  async getReport1({ startTime, endTime }: { startTime?: string; endTime?: string }) {
    // 获取所有操作类型的数据
    const allOperationData = await this.prisma.knifeTool.groupBy({
      by: ['code', 'name', 'operationType', 'deptId', 'supplierId'],
      _sum: {
        quantity: true
      },
      where: {
        createdAt: {
          gte: startTime ? new Date(startTime) : undefined,
          lte: endTime ? new Date(endTime) : undefined
        }
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      }
    })

    // 根据code和name归类数据
    const groupedData = allOperationData.reduce((acc, item) => {
      const key = `${item.code}-${item.name}`
      if (!acc[key]) {
        acc[key] = {
          code: item.code,
          name: item.name,
          operations: {},
          departments: {},
          suppliers: {}
        }
      }

      // 操作类型数据
      acc[key].operations[item.operationType] =
        (acc[key].operations[item.operationType] || 0) + item._sum.quantity

      // 部门数据
      if (item.operationType === 11 || item.operationType === 12 || item.operationType === 31) {
        if (!acc[key].departments[item.deptId]) {
          acc[key].departments[item.deptId] = { 11: 0, 12: 0, 31: 0 }
        }
        acc[key].departments[item.deptId][item.operationType] = item._sum.quantity
      }

      // 供应商数据
      if (item.operationType === 21 || item.operationType === 22) {
        if (!acc[key].suppliers[item.supplierId]) {
          acc[key].suppliers[item.supplierId] = { 21: 0, 22: 0 }
        }
        acc[key].suppliers[item.supplierId][item.operationType] = item._sum.quantity
      }

      return acc
    }, {})

    // 处理数据
    const finalData = await Promise.all(
      Object.values(groupedData).map(async (item: any) => {
        // 计算当前库存
        item.currentStock =
          (item.operations[1] || 0) -
          (item.operations[2] || 0) +
          (item.operations[11] || 0) -
          (item.operations[12] || 0) +
          (item.operations[21] || 0) -
          (item.operations[22] || 0) -
          (item.operations[31] || 0)

        // 提取所有的deptId和supplierId
        const deptIds = Object.keys(item.departments).map((id) => parseInt(id))
        const supplierIds = Object.keys(item.suppliers).map((id) => parseInt(id))

        // 一次性查询所有部门和供应商
        const [depts, suppliers] = await Promise.all([
          this.prisma.dept.findMany({
            where: { id: { in: deptIds } },
            select: { id: true, name: true }
          }),
          this.prisma.supplier.findMany({
            where: { id: { in: supplierIds } },
            select: { id: true, name: true }
          })
        ])

        // 创建查找映射
        const deptMap = new Map(depts.map((d) => [d.id, d.name]))
        const supplierMap = new Map(suppliers.map((s) => [s.id, s.name]))

        // 处理部门数据
        item.departments = Object.entries(item.departments).map(
          ([deptId, operations]: [string, any]) => ({
            deptId,
            deptName: deptMap.get(parseInt(deptId)) || '未知部门',
            inQuantity: operations[11] || 0,
            outQuantity: operations[12] || 0,
            pureQuantity: (operations[12] || 0) - (operations[11] || 0) - (operations[31] || 0)
          })
        )

        // 处理供应商数据
        item.suppliers = Object.entries(item.suppliers).map(
          ([supplierId, operations]: [string, any]) => ({
            supplierId,
            supplierName: supplierMap.get(parseInt(supplierId)) || '未知供应商',
            grindingInQuantity: operations[21] || 0,
            grindingOutQuantity: operations[22] || 0,
            pureGrindingQuantity: (operations[22] || 0) - (operations[21] || 0)
          })
        )

        // 计算可用合计
        item.availableTotal =
          item.currentStock +
          item.departments.reduce((sum, dept) => sum + dept.pureQuantity, 0) +
          item.suppliers.reduce((sum, supplier) => sum + supplier.pureGrindingQuantity, 0)
        return item
      })
    )
    return finalData
  }

  async getReport({ startTime, endTime }: { startTime?: string; endTime?: string }) {
    console.log(startTime, endTime)
    return ''
  }

  async getDeptReport() {
    const deptReport = await this.prisma.knifeTool.groupBy({
      by: ['deptId', 'operationType', 'code', 'name'],
      where: {
        operationType: {
          in: [11, 12, 31]
        }
      },
      _sum: {
        quantity: true
      }
    })

    const depts = await this.prisma.dept.findMany({
      where: {
        useKnifeTool: true
      },
      select: {
        id: true,
        name: true
      }
    })

    const deptMap = new Map(depts.map((dept) => [dept.id, dept.name]))

    const groupedReport = deptReport.reduce((acc, item) => {
      const deptId = item.deptId || 0
      const code = item.code
      const name = item.name

      if (!acc[deptId]) {
        acc[deptId] = {
          deptId,
          deptName: deptMap.get(deptId) || '未知部门',
          tools: {}
        }
      }

      if (!acc[deptId].tools[`${code}-${name}`]) {
        acc[deptId].tools[`${code}-${name}`] = {
          code,
          name,
          inQuantity: 0,
          outQuantity: 0,
          scrapQuantity: 0,
          remainingQuantity: 0
        }
      }

      const tool = acc[deptId].tools[`${code}-${name}`]

      switch (item.operationType) {
        case 11: // 刀具收回
          tool.inQuantity += item._sum.quantity || 0
          break
        case 12: // 刀具借出
          tool.outQuantity += item._sum.quantity || 0
          break
        case 31: // 员工刀具报废
          tool.scrapQuantity += item._sum.quantity || 0
          break
      }

      tool.remainingQuantity = tool.outQuantity - tool.inQuantity - tool.scrapQuantity

      return acc
    }, {})

    const finalReport = Object.values(groupedReport).map((dept: any) => ({
      ...dept,
      tools: Object.values(dept.tools as Record<string, any>)
    }))

    return finalReport
  }

  async getSupplierReport() {
    const supplierReport = await this.prisma.knifeTool.groupBy({
      by: ['supplierId', 'operationType', 'code', 'name'],
      where: {
        operationType: {
          in: [1, 2]
        }
      },
      _sum: {
        quantity: true
      }
    })
    const supplierIds = [
      ...new Set(supplierReport.map((item) => item.supplierId).filter((id) => id !== null))
    ]
    const suppliers = await this.prisma.supplier.findMany({
      where: {
        id: {
          in: supplierIds
        }
      },
      select: {
        id: true,
        name: true
      }
    })

    const supplierMap = new Map(suppliers.map((supplier) => [supplier.id, supplier.name]))

    const groupedReport = supplierReport.reduce((acc, item) => {
      const supplierId = item.supplierId || 0
      const code = item.code
      const name = item.name

      if (!acc[supplierId]) {
        acc[supplierId] = {
          supplierId,
          supplierName: supplierMap.get(supplierId) || '未知供应商',
          tools: {}
        }
      }

      if (!acc[supplierId].tools[`${code}-${name}`]) {
        acc[supplierId].tools[`${code}-${name}`] = {
          code,
          name,
          inQuantity: 0,
          outQuantity: 0,
          remainingQuantity: 0
        }
      }

      const tool = acc[supplierId].tools[`${code}-${name}`]

      switch (item.operationType) {
        case 1: // 刀具入库
          tool.inQuantity += item._sum.quantity || 0
          break
        case 2: // 刀具出库
          tool.outQuantity += item._sum.quantity || 0
          break
      }

      tool.remainingQuantity = tool.inQuantity - tool.outQuantity

      return acc
    }, {})

    const finalReport = Object.values(groupedReport).map((supplier: any) => ({
      ...supplier,
      tools: Object.values(supplier.tools as Record<string, any>)
    }))

    return finalReport
  }

  async getPolishReport() {
    const supplierReport = await this.prisma.knifeTool.groupBy({
      by: ['supplierId', 'operationType', 'code', 'name'],
      where: {
        operationType: {
          in: [21, 22, 32]
        }
      },
      _sum: {
        quantity: true
      }
    })
    const supplierIds = [
      ...new Set(supplierReport.map((item) => item.supplierId).filter((id) => id !== null))
    ]
    const suppliers = await this.prisma.supplier.findMany({
      where: {
        id: {
          in: supplierIds
        }
      },
      select: {
        id: true,
        name: true
      }
    })

    const supplierMap = new Map(suppliers.map((supplier) => [supplier.id, supplier.name]))

    const groupedReport = supplierReport.reduce((acc, item) => {
      const supplierId = item.supplierId || 0
      const code = item.code
      const name = item.name

      if (!acc[supplierId]) {
        acc[supplierId] = {
          supplierId,
          supplierName: supplierMap.get(supplierId) || '未知供应商',
          tools: {}
        }
      }

      if (!acc[supplierId].tools[`${code}-${name}`]) {
        acc[supplierId].tools[`${code}-${name}`] = {
          code,
          name,
          inQuantity: 0,
          outQuantity: 0,
          scrapQuantity: 0,
          remainingQuantity: 0
        }
      }

      const tool = acc[supplierId].tools[`${code}-${name}`]

      switch (item.operationType) {
        case 21: // 修磨收回
          tool.inQuantity += item._sum.quantity || 0
          break
        case 22: // 修磨发出
          tool.outQuantity += item._sum.quantity || 0
          break
        case 32: // 修磨报废
          tool.scrapQuantity += item._sum.quantity || 0
          break
      }

      tool.remainingQuantity = tool.outQuantity - tool.inQuantity - tool.scrapQuantity
      return acc
    }, {})

    const finalReport = Object.values(groupedReport).map((supplier: any) => ({
      ...supplier,
      tools: Object.values(supplier.tools as Record<string, any>)
    }))

    return finalReport
  }
}
