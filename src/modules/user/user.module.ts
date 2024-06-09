import { Module } from '@nestjs/common'

import { MenuModule } from '../system/menu/menu.module'

import { RoleModule } from '../system/role/role.module'

import { UserController } from './user.controller'
import { UserService } from './user.service'

const providers = [UserService]

@Module({
  imports: [RoleModule, MenuModule],
  controllers: [UserController],
  providers: [...providers],
  exports: [...providers]
})
export class UserModule {}
