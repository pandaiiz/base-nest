import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'

import { isDev } from '~/global/env'

import { LoggerModule } from './logger/logger.module'

@Global()
@Module({
  imports: [
    // logger
    LoggerModule.forRoot(),
    // http
    HttpModule,
    // schedule
    ScheduleModule.forRoot(),
    // rate limit
    ThrottlerModule.forRoot([
      {
        limit: 3,
        ttl: 60000
      }
    ]),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 20,
      verboseMemoryLeak: isDev,
      ignoreErrors: false
    })
  ],
  exports: [HttpModule]
})
export class SharedModule {}
