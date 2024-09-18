import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'

import Redis from 'ioredis'

@Injectable()
export class MailerService {
  constructor(@InjectRedis() private redis: Redis) {}
}
