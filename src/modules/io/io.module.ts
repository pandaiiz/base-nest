import { Module } from '@nestjs/common'
import { IoOrderModule } from './io-order/io-order.module'

@Module({
  imports: [IoOrderModule]
})
export class IoModule {}
