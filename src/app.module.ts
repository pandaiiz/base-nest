import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { PrismaModule } from 'nestjs-prisma'
import config from '~/config'
import { SharedModule } from '~/shared/shared.module'
import { AllExceptionsFilter } from './common/filters/any-exception.filter'
import { IdempotenceInterceptor } from './common/interceptors/idempotence.interceptor'
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AuthModule } from './modules/auth/auth.module'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import { RbacGuard } from './modules/auth/guards/rbac.guard'
import { HealthModule } from './modules/health/health.module'
import { SystemModule } from './modules/system/system.module'
import { ToolsModule } from './modules/tools/tools.module'
import { RelationshipModule } from '~/modules/relationship/relationship.module'
import { IoModule } from './modules/io/io.module'
import { join } from 'node:path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    PrismaModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      load: [...Object.values(config)]
    }),
    SharedModule,
    AuthModule,
    SystemModule,
    RelationshipModule,
    ToolsModule,
    HealthModule,
    IoModule
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useFactory: () => new TimeoutInterceptor(15 * 1000) },
    { provide: APP_INTERCEPTOR, useClass: IdempotenceInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RbacGuard }
  ]
})
export class AppModule {}
