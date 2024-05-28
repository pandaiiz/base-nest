import { Column, Entity } from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'

@Entity({ name: 'sys_menu' })
export class MenuEntity extends CommonEntity {
  @Column({ name: 'parent_id', nullable: true })
  parentId: number

  @Column()
  name: string

  @Column({ nullable: true })
  path: string

  @Column({ nullable: true })
  permission: string

  @Column({ type: 'string', default: 'MENU' })
  type: string

  @Column({ nullable: true, default: '' })
  icon: string

  @Column({ name: 'component', nullable: true })
  component: string

  @Column({ type: 'tinyint', default: 1 })
  show: number

  @Column({ type: 'tinyint', default: 1 })
  status: number
}
