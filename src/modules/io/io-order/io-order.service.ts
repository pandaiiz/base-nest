import { Injectable } from '@nestjs/common'
import { ioOrder } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CrudService } from '~/helper/crud/crud.service'

@Injectable()
export class IoOrderService extends CrudService<ioOrder> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.ioOrder)
  }

  async create1(data: ioOrder, user: IAuthUser): Promise<ioOrder> {
    const lastOrder = await this.prisma.ioOrder.findFirst({
      orderBy: { id: 'desc' }
    })
    const nextOrderNumber = lastOrder ? (lastOrder.id + 100000).toString() : '100000'

    return this.prisma.ioOrder.create({
      data: {
        ...data,
        orderNumber: nextOrderNumber,
        createdBy: user.uid
      }
    })
  }
}
