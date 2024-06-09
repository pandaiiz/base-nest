import { Injectable } from '@nestjs/common'
import { deleteFile } from '~/utils'

import { StorageCreateDto, StoragePageDto } from './storage.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class StorageService {
  constructor(private prisma: PrismaService) {}

  async create(dto: StorageCreateDto, userId: number): Promise<void> {
    await this.prisma.storage.create({
      data: {
        ...dto,
        userId
      }
    })
  }

  /**
   * 删除文件
   */
  async delete(fileIds: number[]): Promise<void> {
    const items = await this.prisma.storage.findMany({
      where: { id: { in: fileIds } }
    })
    await this.prisma.storage.deleteMany({
      where: { id: { in: fileIds } }
    })
    items.forEach((el) => {
      deleteFile(el.path)
    })
  }

  async list({
    current,
    pageSize,
    name,
    type,
    size,
    extName,
    time,
    username
  }: StoragePageDto): Promise<any> {
    // }: StoragePageDto): Promise<Index<StorageInfo>> {
    const query = {
      where: {
        ...(name && { name: { contains: name } }),
        ...(type && { type }),
        ...(extName && { extName }),
        ...(size && { size: { gte: size[0], lte: size[1] } }),
        ...(time && { createdAt: { gte: time[0], lte: time[1] } }),
        ...(username && {
          userId: (await this.prisma.user.findUnique({ where: { username } })).id
        })
      },
      skip: (+current - 1) * +pageSize,
      take: +pageSize
    }
    const [list, total] = await this.prisma.$transaction([
      this.prisma.storage.findMany({
        ...query
      }),
      this.prisma.storage.count(query)
    ])

    return {
      list,
      pagination: {
        total,
        currentPage: current,
        pageSize
      }
    }
  }

  async count(): Promise<number> {
    return this.prisma.storage.count()
  }
}
