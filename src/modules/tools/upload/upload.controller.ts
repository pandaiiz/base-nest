import { BadRequestException, Controller, Post, Req } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'

import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'

import { FileUploadDto } from './upload.dto'
import { UploadService } from './upload.service'

@ApiSecurityAuth()
@ApiTags('Tools - 上传模块')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: '上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto
  })
  async upload(@Req() req: FastifyRequest, @AuthUser() user: IAuthUser) {
    if (!req.isMultipart()) throw new BadRequestException('Request is not multipart')
    const file = await req.file()
    try {
      const path = await this.uploadService.saveFile(file, user.uid)
      return { filename: path }
    } catch (error) {
      throw new BadRequestException('上传失败')
    }
  }
}
