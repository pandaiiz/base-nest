import { AppConfig, IAppConfig, appRegToken } from './app.config'
import { IMailerConfig, MailerConfig, mailerRegToken } from './mailer.config'
import { IOssConfig, OssConfig, ossRegToken } from './oss.config'
import { IRedisConfig, RedisConfig, redisRegToken } from './redis.config'
import { ISecurityConfig, SecurityConfig, securityRegToken } from './security.config'
import { ISwaggerConfig, SwaggerConfig, swaggerRegToken } from './swagger.config'

export * from './app.config'
export * from './redis.config'
export * from './swagger.config'
export * from './security.config'
export * from './mailer.config'
export * from './oss.config'

export interface AllConfigType {
  [appRegToken]: IAppConfig
  [mailerRegToken]: IMailerConfig
  [redisRegToken]: IRedisConfig
  [securityRegToken]: ISecurityConfig
  [swaggerRegToken]: ISwaggerConfig
  [ossRegToken]: IOssConfig
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>

export default {
  AppConfig,
  MailerConfig,
  OssConfig,
  RedisConfig,
  SecurityConfig,
  SwaggerConfig
}
