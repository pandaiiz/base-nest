import { Module } from '@nestjs/common'

import { RouterModule } from '@nestjs/core'

import { StorageModule } from './storage/storage.module'
import { UploadModule } from './upload/upload.module'

const modules = [StorageModule, UploadModule]

@Module({
  imports: [...modules, RouterModule.register([
    {
      path: 'tools',
      module: ToolsModule,
      children: [...modules],
    },
  ])],
  exports: [...modules],
})
export class ToolsModule {}
