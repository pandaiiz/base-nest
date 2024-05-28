import { Injectable } from '@nestjs/common'
import { isEmpty } from 'lodash'
import { PrismaService } from 'nestjs-prisma'
import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'

import { DeptDto, DeptQueryDto } from './dept.dto'
import { Dept } from '@prisma/client'

@Injectable()
export class DeptService {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<Dept[]> {
    return this.prisma.dept.findMany({
      orderBy: {
        sort: 'desc'
      }
    })
  }

  async info(id: number): Promise<Dept> {
    const dept = await this.prisma.dept.findUnique({
      where: { id }
    })

    if (isEmpty(dept)) throw new BusinessException(ErrorEnum.DEPARTMENT_NOT_FOUND)

    return dept
  }

  async create(data: DeptDto): Promise<void> {
    await this.prisma.dept.create({ data })
  }

  async update(id: number, data: DeptDto): Promise<void> {
    await this.prisma.dept.update({
      where: { id },
      data
    })
  }

  async delete(id: number): Promise<void> {
    await this.prisma.dept.delete({ where: { id } })
  }

  /**
   * 根据部门查询关联的用户数量
   */
  async countUserByDeptId(id: number): Promise<number> {
    return this.prisma.user.count({ where: { deptId: id } })
  }

  /**
   * 获取部门列表树结构
   */
  async getDeptList(uid: number, { name }: DeptQueryDto): Promise<Dept[]> {
    return this.prisma.dept.findMany({
      where: {
        name: {
          contains: name
        }
      },
      orderBy: {
        sort: 'asc'
      }
    })
  }
}
