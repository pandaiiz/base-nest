import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'

import { Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { FastifyRequest } from 'fastify'

import { hashString } from '~/utils'
import { getRedisKey } from '~/utils/redis.util'

import { HTTP_IDEMPOTENCE_KEY, HTTP_IDEMPOTENCE_OPTIONS } from '../decorators/idempotence.decorator'

const IdempotenceHeaderKey = 'x-idempotence'

export interface IdempotenceOption {
  errorMessage?: string
  pendingMessage?: string

  /**
   * 如果重复请求的话，手动处理异常
   */
  handler?: (req: FastifyRequest) => any

  /**
   * 记录重复请求的时间
   * @default 60
   */
  expired?: number

  /**
   * 如果 header 没有幂等 key，根据 request 生成 key，如何生成这个 key 的方法
   */
  generateKey?: (req: FastifyRequest) => string

  /**
   * 仅读取 header 的 key，不自动生成
   * @default false
   */
  disableGenerateKey?: boolean
}

@Injectable()
export class IdempotenceInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<FastifyRequest>()

    // skip Get 请求
    if (request.method.toUpperCase() === 'GET') return next.handle()

    const handler = context.getHandler()
    const options: IdempotenceOption | undefined = this.reflector.get(
      HTTP_IDEMPOTENCE_OPTIONS,
      handler
    )

    if (!options) return next.handle()

    const { disableGenerateKey = false } = options

    const idempotence = request.headers[IdempotenceHeaderKey] as string
    const key = disableGenerateKey
      ? undefined
      : options.generateKey
        ? options.generateKey(request)
        : this.generateKey(request)

    const idempotenceKey =
      !!(idempotence || key) && getRedisKey(`idempotence:${idempotence || key}`)

    SetMetadata(HTTP_IDEMPOTENCE_KEY, idempotenceKey)(handler)
  }

  private generateKey(req: FastifyRequest) {
    const { body, params, query = {}, headers, url } = req

    const obj = { body, url, params, query } as any

    const uuid = headers['x-uuid']
    if (uuid) {
      obj.uuid = uuid
    } else {
      const ua = headers['user-agent']

      if (!ua) return undefined

      Object.assign(obj, { ua })
    }

    return hashString(JSON.stringify(obj))
  }
}
