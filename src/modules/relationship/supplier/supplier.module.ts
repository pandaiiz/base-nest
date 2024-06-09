import { Module } from '@nestjs/common'

import { SupplierController } from './supplier.controller'
import { SupplierService } from './supplier.service'

const services = [SupplierService]

@Module({
  controllers: [SupplierController],
  providers: [...services],
  exports: [...services]
})
export class SupplierModule {}
