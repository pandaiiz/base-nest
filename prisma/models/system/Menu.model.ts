import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import RoleModel from './Role.model'
import MenuTypeEnum from '../../enums/MenuType.enum'

export default createModel((MenuModel) => {
  MenuModel.mixin(BaseMixin)
    .int('parentId', { optional: true, map: 'parent_id' })
    .string('name')
    .string('path', { optional: true })
    .string('permission', { optional: true })
    .enum('type', MenuTypeEnum)
    .string('icon', { optional: true })
    .int('sort', { optional: true, default: 0 })
    .string('path', { optional: true })
    .string('component', { optional: true })
    .int('show', { default: 1 })
    .int('status', { default: 1 })
    // 菜单和角色是多对多关系
    .relation('roles', RoleModel, {
      list: true,
      comments: ['// 角色'],
      raw: '@relation("sys_menu_role")'
    })
    .map('sys_menu')
})
