import { Module } from '@nestjs/common'

import { UserModule } from '../../user/user.module'
import { LogController } from './log.controller'
import { LoginLogService } from './services/login-log.service'

const providers = [LoginLogService]

@Module({
  imports: [UserModule],
  controllers: [LogController],
  providers: [...providers],
  exports: [...providers]
})
export class LogModule {}
