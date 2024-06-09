import { Module } from '@nestjs/common'

import { RouterModule } from '@nestjs/core'
import { SupplierModule } from '~/modules/relationship/supplier/supplier.module'

const modules = [SupplierModule]

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
