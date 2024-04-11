import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { isEmpty } from 'lodash'
import { PrismaService } from 'nestjs-prisma'
import { EntityManager, Repository, TreeRepository } from 'typeorm'

import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'
import { DeptEntity } from '~/modules/system/dept/dept.entity'
import { UserEntity } from '~/modules/user/user.entity'

import { DeptDto, DeptQueryDto } from './dept.dto'

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(DeptEntity)
    private deptRepository: TreeRepository<DeptEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
    private prisma: PrismaService
  ) {}

  async list(): Promise<DeptEntity[]> {
    return this.deptRepository.find({ order: { orderNo: 'DESC' } })
  }

  async info(id: number): Promise<DeptEntity> {
    const dept = await this.deptRepository
      .createQueryBuilder('dept')
      .leftJoinAndSelect('dept.parent', 'parent')
      .where({ id })
      .getOne()

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
    return this.userRepository.countBy({ dept: { id } })
  }

  /**
   * 查找当前部门下的子部门数量
   */
  async countChildDept(id: number): Promise<number> {
    const item = await this.deptRepository.findOneBy({ id })
    return (await this.deptRepository.countDescendants(item)) - 1
  }

  /**
   * 获取部门列表树结构
   */
  async getDeptList(uid: number, { name }: DeptQueryDto): Promise<any[]> {
    return this.prisma.dept.findMany({
      where: {
        name: {
          contains: name
        }
      },
      orderBy: {
        orderNo: 'asc'
      }
    })
  }
}
