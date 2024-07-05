import { Module } from '@nestjs/common'

import { CustomerController } from './customer.controller'
import { CustomerService } from './customer.service'

const services = [CustomerService]

@Module({
  controllers: [CustomerController],
  providers: [...services],
  exports: [...services]
})
export class CustomerModule {}
