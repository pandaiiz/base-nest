import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import DictItemModel from './DictItem.model'

export default createModel((DictTypeModel) => {
  DictTypeModel.mixin(BaseMixin)
    .string('name', { comments: ['// 字典名称'], unique: true })
    .string('code', { comments: ['// 字典编码'], unique: true })
    .int('status', { optional: true, default: 0, comments: ['// 状态'] })
    .string('remark', { optional: true, comments: ['// 备注'] })
    .int('sort', { optional: true, default: 0 })
    .relation('items', DictItemModel, {
      list: true,
      comments: ['// 值列表']
    })
    .map('sys_dict_type')
})
