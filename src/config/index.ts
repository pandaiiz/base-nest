import { AppConfig, IAppConfig, appRegToken } from './app.config'
import { ISecurityConfig, SecurityConfig, securityRegToken } from './security.config'
import { ISwaggerConfig, SwaggerConfig, swaggerRegToken } from './swagger.config'

export * from './app.config'
export * from './swagger.config'
export * from './security.config'

export interface AllConfigType {
  [appRegToken]: IAppConfig
  [securityRegToken]: ISecurityConfig
  [swaggerRegToken]: ISwaggerConfig
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>

export default {
  AppConfig,
  SecurityConfig,
  SwaggerConfig
}
