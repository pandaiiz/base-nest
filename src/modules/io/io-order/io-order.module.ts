import { Module } from '@nestjs/common'
import { IoOrderService } from './io-order.service'
import { IoOrderController } from './io-order.controller'

@Module({
  controllers: [IoOrderController],
  providers: [IoOrderService]
})
export class IoOrderModule {}
