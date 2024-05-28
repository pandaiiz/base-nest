import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import UserModel from './User.model'

export default createModel((DeptModel) => {
  DeptModel.mixin(BaseMixin)
    .string('name', { comments: ['// 部门名称'] })
    .int('sort', { optional: true, default: 0 })
    .relation('users', UserModel, {
      list: true,
      comments: ['// 用户列表']
    })
    .map('sys_dept')
})
