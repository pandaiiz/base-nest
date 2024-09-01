import { Module } from '@nestjs/common'

import { RouterModule } from '@nestjs/core'
import { SupplierModule } from '~/modules/relationship/supplier/supplier.module'
import { CustomerModule } from '~/modules/relationship/customer/customer.module'
import { EmployeeModule } from '~/modules/relationship/employee/employee.module'
import { MaterialModule } from '~/modules/relationship/material/material.module'
import { ToolModule } from '~/modules/relationship/tool/tool.module'

const modules = [SupplierModule, CustomerModule, EmployeeModule, MaterialModule, ToolModule]

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
