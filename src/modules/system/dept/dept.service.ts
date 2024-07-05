import { Injectable } from '@nestjs/common'
import { Dept } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CrudService } from '~/helper/crud/crud.service'

@Injectable()
export class DeptService extends CrudService<Dept> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.dept)
  }

  /**
   * 根据部门查询关联的用户数量
   */
  async countUserByDeptId(id: number): Promise<number> {
    return this.prisma.user.count({ where: { deptId: id } })
  }
}
