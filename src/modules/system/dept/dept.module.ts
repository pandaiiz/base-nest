import { Module } from '@nestjs/common'

import { UserModule } from '../../user/user.module'
import { RoleModule } from '../role/role.module'

import { DeptController } from './dept.controller'
import { DeptService } from './dept.service'

const services = [DeptService]

@Module({
  imports: [UserModule, RoleModule],
  controllers: [DeptController],
  providers: [...services],
  exports: [...services]
})
export class DeptModule {}
