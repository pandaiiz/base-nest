import { Global, Module, type Provider } from '@nestjs/common'

import { CronService } from './cron.service'

const providers: Provider[] = [CronService]

@Global()
@Module({
  imports: [],
  providers,
  exports: providers
})
export class HelperModule {}
