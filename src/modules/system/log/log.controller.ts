import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'

import { LoginLogQueryDto } from './dto/log.dto'
import { LoginLogInfo } from './models/log.model'
import { LoginLogService } from './services/login-log.service'

export const permissions = definePermission('system:log', {
  TaskList: 'task:list',
  LogList: 'login:list',
  CaptchaList: 'captcha:list'
} as const)

@ApiSecurityAuth()
@ApiTags('System - 日志模块')
@Controller('log')
export class LogController {
  constructor(private loginLogService: LoginLogService) {}

  @Get('login/list')
  @ApiOperation({ summary: '查询登录日志列表' })
  @ApiResult({ type: [LoginLogInfo], isPage: true })
  @Perm(permissions.TaskList)
  async loginLogPage(@Query() dto: LoginLogQueryDto): Promise<any> {
    // ): Promise<Index<LoginLogInfo>> {
    return this.loginLogService.list(dto)
  }
}
