import { Module, forwardRef } from '@nestjs/common'

import { SseService } from '~/modules/sse/sse.service'

import { RoleModule } from '../role/role.module'

import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'

const providers = [MenuService, SseService]

@Module({
  imports: [forwardRef(() => RoleModule)],
  controllers: [MenuController],
  providers: [...providers],
  exports: [...providers]
})
export class MenuModule {}
