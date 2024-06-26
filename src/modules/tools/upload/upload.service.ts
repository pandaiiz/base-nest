import { MultipartFile } from '@fastify/multipart'
import { Injectable, NotFoundException } from '@nestjs/common'
import dayjs from 'dayjs'
import { isNil } from 'lodash'
import { PrismaService } from 'nestjs-prisma'

import {
  fileRename,
  getExtname,
  getFilePath,
  getFileType,
  getSize,
  saveLocalFile
} from '~/utils/file.util'

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  /**
   * 保存文件上传记录
   */
  async saveFile(file: MultipartFile, userId: number): Promise<string> {
    if (isNil(file)) throw new NotFoundException('Have not any file to upload!')

    const fileName = file.filename
    const size = getSize(file.file.bytesRead)
    const extName = getExtname(fileName)
    const type = getFileType(extName)
    const name = fileRename(fileName)
    const currentDate = dayjs().format('YYYY-MM-DD')
    const path = getFilePath(name, currentDate, type)

    await saveLocalFile(await file.toBuffer(), name, currentDate, type)

    await this.prisma.storage.create({
      data: {
        name,
        fileName,
        extName,
        path,
        type,
        size,
        userId
      }
    })
    return path
  }
}
