import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import UserModel from './User.model'

export default createModel((LoginLogModel) => {
  LoginLogModel.mixin(BaseMixin)
    .string('ip', { optional: true, comments: ['// IP'] })
    .string('address', { optional: true, comments: ['// 地址'] })
    .string('provider', { optional: true, comments: ['// 登录方式'] })
    .string('ua', { optional: true, comments: ['// 浏览器ua'], raw: '@database.VarChar(500)' })
    .relation('user', UserModel, {
      optional: true,
      fields: ['userId'],
      references: ['id'],
      comments: ['// 用户']
    })
    .int('userId', { optional: true, comments: ['// 用户ID'], map: 'user_id' })
    .raw('@@index([userId])')
    .map('sys_login_log')
})
