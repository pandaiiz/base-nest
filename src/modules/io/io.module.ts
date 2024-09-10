import { Module } from '@nestjs/common'
import { IoOrderModule } from './order/order.module'
import { KnifeToolModule } from './knife-tool/knife-tool.module'
import { MaterialModule } from './material/material.module'
import { RouterModule } from '@nestjs/core'
const modules = [KnifeToolModule, IoOrderModule, MaterialModule]

@Module({
  imports: [
    ...modules,
    RouterModule.register([
      {
        path: 'io',
        module: IoModule,
        children: [...modules]
      }
    ])
  ],
  exports: [...modules]
})
export class IoModule {}
