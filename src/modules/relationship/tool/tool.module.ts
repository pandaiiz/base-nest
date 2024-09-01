import { Module } from '@nestjs/common'

import { ToolController } from './tool.controller'
import { ToolService } from './tool.service'

const services = [ToolService]

@Module({
  controllers: [ToolController],
  providers: [...services],
  exports: [...services]
})
export class ToolModule {}
