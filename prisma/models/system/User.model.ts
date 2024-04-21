import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import RoleModel from './Role.model'
import DeptModel from './Dept.model'
import AccessTokenModel from './AccessToken.model'
import LoginLogModel from './LoginLog.model'

export default createModel((UserModel) => {
  UserModel.mixin(BaseMixin)
    .string('username', { unique: true })
    .string('password')
    .string('psalt', { raw: '@database.VarChar(32)' })
    .string('nickname', { optional: true })
    .string('avatar', { optional: true })
    .string('qq', { optional: true })
    .string('email', { optional: true })
    .string('phone', { optional: true })
    .string('remark', { optional: true })
    .int('status', { optional: true, default: 1 })
    .string('icon', { optional: true })
    .int('sort', { optional: true, default: 0 })
    .string('path', { optional: true })
    .string('component', { optional: true })
    // 用户和部门是多对一关系
    .relation('dept', DeptModel, { optional: true, fields: ['deptId'], references: ['id'] })
    .int('deptId', { optional: true, map: 'dept_id' })
    // 用户和角色是多对多关系
    .relation('roles', RoleModel, {
      list: true,
      comments: ['// 角色'],
      raw: '@relation("sys_user_role")'
    })
    // 用户和token是一对多关系
    .relation('accessTokens', AccessTokenModel, {
      list: true,
      comments: ['// Token']
    })
    // 用户和Login Log是一对多关系
    .relation('loginLogs', LoginLogModel, {
      list: true,
      comments: ['// LoginLogs']
    })
    .raw('@@index([deptId])')
    .map('sys_user')
})

//   @ManyToOne(() => DeptEntity, (dept) => dept.users)
//   @JoinColumn({ name: 'dept_id' })
//   dept: Relation<DeptEntity>

//   @OneToMany(() => AccessTokenEntity, (accessToken) => accessToken.user, {
//     cascade: true
//   })
//   accessTokens: Relation<AccessTokenEntity[]>
// }
