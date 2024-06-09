import { Module, forwardRef } from '@nestjs/common'

import { SseService } from '~/modules/sse/sse.service'

import { MenuModule } from '../menu/menu.module'

import { RoleController } from './role.controller'
import { RoleService } from './role.service'

const providers = [RoleService, SseService]

@Module({
  imports: [forwardRef(() => MenuModule)],
  controllers: [RoleController],
  providers: [...providers],
  exports: [...providers]
})
export class RoleModule {}
