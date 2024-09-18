import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { FastifyRequest } from 'fastify'
import { isEmpty, isNil } from 'lodash'

import { ExtractJwt } from 'passport-jwt'

import { BusinessException } from '~/common/exceptions/biz.exception'
import { AppConfig, IAppConfig } from '~/config'
import { ErrorEnum } from '~/constants/error-code.constant'
import { AuthService } from '~/modules/auth/auth.service'

import { checkIsDemoMode } from '~/utils'

import { AuthStrategy, PUBLIC_KEY } from '../auth.constant'
import { TokenService } from '../services/token.service'

// https://docs.nestjs.com/recipes/passport#implement-protected-route-and-jwt-strategy-guards
@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategy.JWT) {
  jwtFromRequestFn = ExtractJwt.fromAuthHeaderAsBearerToken()

  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private tokenService: TokenService,
    @Inject(AppConfig.KEY) private appConfig: IAppConfig
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    const request = context.switchToHttp().getRequest<FastifyRequest>()
    // const response = context.switchToHttp().getResponse<FastifyReply>()

    // TODO 此处代码的作用是判断如果在演示环境下，则拒绝用户的增删改操作，去掉此代码不影响正常的业务逻辑
    if (request.method !== 'GET' && !request.url.includes('/auth/login')) checkIsDemoMode()

    const isSse = request.headers.accept === 'text/event-stream'

    if (isSse && !request.headers.authorization?.startsWith('Bearer ')) {
      const { token } = request.query as Record<string, string>
      if (token) request.headers.authorization = `Bearer ${token}`
    }

    const token = this.jwtFromRequestFn(request)

    request.accessToken = token

    let result: any = false
    try {
      result = await super.canActivate(context)
    } catch (err) {
      // 需要后置判断 这样携带了 token 的用户就能够解析到 request.user
      if (isPublic) return true

      if (isEmpty(token)) throw new UnauthorizedException('未登录')

      // 在 handleRequest 中 user 为 null 时会抛出 UnauthorizedException
      if (err instanceof UnauthorizedException) throw new BusinessException(ErrorEnum.INVALID_LOGIN)

      // 判断 token 是否有效且存在, 如果不存在则认证失败
      const isValid = isNil(token) ? undefined : await this.tokenService.checkAccessToken(token!)

      if (!isValid) throw new BusinessException(ErrorEnum.INVALID_LOGIN)
    }

    return result
  }

  handleRequest(err: any, user: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) throw err || new UnauthorizedException()
    return user
  }
}
