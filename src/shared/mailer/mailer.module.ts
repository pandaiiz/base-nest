import { Module, Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer'

import { ConfigKeyPaths, IMailerConfig } from '~/config'

import { MailerService } from './mailer.service'

const providers: Provider<any>[] = [MailerService]

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => ({
        transport: configService.get<IMailerConfig>('mailer')
      }),
      inject: [ConfigService]
    })
  ],
  providers,
  exports: providers
})
export class MailerModule {}
