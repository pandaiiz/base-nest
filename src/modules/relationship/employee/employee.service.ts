import { Injectable } from '@nestjs/common'
import { Employee } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CrudService } from '~/helper/crud/crud.service'

@Injectable()
export class EmployeeService extends CrudService<Employee> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.employee)
  }
}
