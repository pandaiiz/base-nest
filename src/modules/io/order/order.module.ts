import { Module } from '@nestjs/common'
import { IoOrderService } from './order.service'
import { IoOrderController } from './order.controller'

@Module({
  controllers: [IoOrderController],
  providers: [IoOrderService]
})
export class IoOrderModule {}
