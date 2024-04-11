import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany, Relation, Tree } from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'

import { UserEntity } from '../../user/user.entity'

@Entity({ name: 'sys_dept' })
@Tree('materialized-path')
export class DeptEntity extends CommonEntity {
  @Column()
  @ApiProperty({ description: '部门名称' })
  name: string

  @Column({ nullable: true, default: 0 })
  @ApiProperty({ description: '排序' })
  orderNo: number

  @Column({ nullable: true, default: 0 })
  @ApiProperty({ description: '父ID' })
  parentId?: number

  @ApiHideProperty()
  @OneToMany(() => UserEntity, (user) => user.dept)
  users: Relation<UserEntity[]>
}
