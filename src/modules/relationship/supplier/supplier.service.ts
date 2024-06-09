import { Injectable } from '@nestjs/common'
import { Supplier } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CrudService } from '~/helper/crud/crud.service'

@Injectable()
export class SupplierService extends CrudService<Supplier> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.supplier)
  }
}
