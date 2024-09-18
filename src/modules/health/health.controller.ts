import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import {
  DiskHealthIndicator,
  HealthCheck,
  HttpHealthIndicator,
  MemoryHealthIndicator
} from '@nestjs/terminus'

import { Perm, definePermission } from '../auth/decorators/permission.decorator'

export const PermissionHealth = definePermission('app:health', {
  NETWORK: 'network',
  DB: 'database',
  MH: 'memory-heap',
  MR: 'memory-rss',
  DISK: 'disk'
} as const)

@ApiTags('Health - 健康检查')
@Controller('health')
export class HealthController {
  constructor(
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator
  ) {}

  @Get('network')
  @HealthCheck()
  @Perm(PermissionHealth.NETWORK)
  async checkNetwork() {
    return this.http.pingCheck('buqiyuan', 'https://buqiyuan.gitee.io/')
  }

  @Get('memory-heap')
  @HealthCheck()
  @Perm(PermissionHealth.MH)
  async checkMemoryHeap() {
    return this.memory.checkHeap('memory-heap', 200 * 1024 * 1024)
  }

  @Get('memory-rss')
  @HealthCheck()
  @Perm(PermissionHealth.MR)
  async checkMemoryRSS() {
    return this.memory.checkRSS('memory-rss', 200 * 1024 * 1024)
  }

  @Get('disk')
  @HealthCheck()
  @Perm(PermissionHealth.DISK)
  async checkDisk() {
    return this.disk.checkStorage('disk', {
      thresholdPercent: 0.75,
      path: '/'
    })
  }
}
