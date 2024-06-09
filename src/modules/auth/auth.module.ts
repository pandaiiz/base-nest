import { Module } from '@nestjs/common'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { ConfigKeyPaths, ISecurityConfig } from '~/config'
import { isDev } from '~/global/env'

import { LogModule } from '../system/log/log.module'
import { MenuModule } from '../system/menu/menu.module'
import { RoleModule } from '../system/role/role.module'
import { UserModule } from '../user/user.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AccountController } from './controllers/account.controller'
import { TokenService } from './services/token.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

const controllers = [AuthController, AccountController]
const providers = [AuthService, TokenService]
const strategies = [LocalStrategy, JwtStrategy]

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
        const { jwtSecret, jwtExprire } = configService.get<ISecurityConfig>('security')

        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: `${jwtExprire}s`
          },
          ignoreExpiration: isDev
        }
      },
      inject: [ConfigService]
    }),
    UserModule,
    RoleModule,
    MenuModule,
    LogModule
  ],
  controllers: [...controllers],
  providers: [...providers, ...strategies],
  exports: [JwtModule, ...providers]
})
export class AuthModule {}
