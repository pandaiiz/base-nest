import { Module } from '@nestjs/common'

import { KnifeToolController } from './knife-tool.controller'
import { KnifeToolService } from './knife-tool.service'

const services = [KnifeToolService]

@Module({
  controllers: [KnifeToolController],
  providers: [...services],
  exports: [...services]
})
export class KnifeToolModule {}
