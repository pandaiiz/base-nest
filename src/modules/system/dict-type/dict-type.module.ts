import { Module } from '@nestjs/common'

import { DictTypeController } from './dict-type.controller'
import { DictTypeService } from './dict-type.service'

const services = [DictTypeService]

@Module({
  controllers: [DictTypeController],
  providers: [...services],
  exports: [...services]
})
export class DictTypeModule {}
