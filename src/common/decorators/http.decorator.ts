import type { ExecutionContext } from '@nestjs/common'

import { createParamDecorator } from '@nestjs/common'
import type { FastifyRequest } from 'fastify'

/**
 * 快速获取request path，并不包括url params
 */
export const Uri = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<FastifyRequest>()
  return request.routerPath
})
