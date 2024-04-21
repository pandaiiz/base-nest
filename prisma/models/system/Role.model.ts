import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import MenuModel from './Menu.model'
import UserModel from './User.model'

export default createModel((RoleModel) => {
  RoleModel.mixin(BaseMixin)
    .string('name', { unique: true, raw: '@database.VarChar(50)', comments: ['// 角色名'] })
    .string('value', { unique: true, comments: ['// 角色标识'] })
    .string('remark', { optional: true, comments: ['// 角色描述'] })
    .int('status', { optional: true, default: 1, comments: ['// 状态：1启用，0禁用'] })
    .boolean('default', { optional: true, default: false, comments: ['// 是否默认用户'] })
    // 菜单和角色是多对多关系
    .relation('menus', MenuModel, {
      list: true,
      comments: ['// 菜单'],
      raw: '@relation("sys_menu_role")'
    })
    // 用户和角色是多对多关系
    .relation('users', UserModel, {
      list: true,
      comments: ['// 用户'],
      raw: '@relation("sys_user_role")'
    })
    .map('sys_role')
})
