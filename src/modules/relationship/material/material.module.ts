import { Module } from '@nestjs/common'

import { MaterialController } from './material.controller'
import { MaterialService } from './material.service'

const services = [MaterialService]

@Module({
  controllers: [MaterialController],
  providers: [...services],
  exports: [...services]
})
export class MaterialModule {}
