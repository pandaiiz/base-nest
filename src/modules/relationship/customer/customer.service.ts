import { Injectable } from '@nestjs/common'
import { Customer } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CrudService } from '~/helper/crud/crud.service'

@Injectable()
export class CustomerService extends CrudService<Customer> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.customer)
  }
}
