import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SseService } from '~/modules/sse/sse.service'

import { RoleModule } from '../role/role.module'

import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'

const providers = [MenuService, SseService]

@Module({
  imports: [TypeOrmModule.forFeature([]), forwardRef(() => RoleModule)],
  controllers: [MenuController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers]
})
export class MenuModule {}
