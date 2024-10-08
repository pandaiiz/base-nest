import { Module } from '@nestjs/common'

import { RouterModule } from '@nestjs/core'
import { SupplierModule } from '~/modules/relationship/supplier/supplier.module'
import { CustomerModule } from '~/modules/relationship/customer/customer.module'
import { EmployeeModule } from '~/modules/relationship/employee/employee.module'
const modules = [SupplierModule, CustomerModule, EmployeeModule]

@Module({
  imports: [
    ...modules,
    RouterModule.register([
      {
        path: 'relationship',
        module: RelationshipModule,
        children: [...modules]
      }
    ])
  ],
  exports: [...modules]
})
export class RelationshipModule {}
