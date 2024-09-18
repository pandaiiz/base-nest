import { Module, forwardRef } from '@nestjs/common'

import { RoleModule } from '../role/role.module'

import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'

const providers = [MenuService]

@Module({
  imports: [forwardRef(() => RoleModule)],
  controllers: [MenuController],
  providers: [...providers],
  exports: [...providers]
})
export class MenuModule {}
