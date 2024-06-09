import { Module } from '@nestjs/common'
import { DictItemController } from './dict-item.controller'
import { DictItemService } from './dict-item.service'

const services = [DictItemService]

@Module({
  controllers: [DictItemController],
  providers: [...services],
  exports: [...services]
})
export class DictItemModule {}
