import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CronExpression } from '@nestjs/schedule'
import { CronOnce } from '~/common/decorators/cron-once.decorator'
import { ConfigKeyPaths } from '~/config'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class CronService {
  private logger: Logger = new Logger(CronService.name)
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService<ConfigKeyPaths>
  ) {}

  @CronOnce(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteExpiredJWT() {
    this.logger.log('--> 开始扫表，清除过期的 token')
    const expiredTokens = await this.prisma.accessToken.findMany({
      where: {
        expiredAt: {
          lt: new Date()
        }
      }
    })
    // 删除多个token
    await this.prisma.accessToken.deleteMany({
      where: {
        value: {
          in: expiredTokens.map((token) => token.value)
        }
      }
    })

    this.logger.log(`--> 删除了 ${expiredTokens.length} 个过期的 token`)
  }
}
