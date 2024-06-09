import { Module } from '@nestjs/common'
import { StorageController } from './storage.controller'
import { StorageService } from './storage.service'

const services = [StorageService]

@Module({
  controllers: [StorageController],
  providers: [...services],
  exports: [...services]
})
export class StorageModule {}
