import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import DictTypeModel from './DictType.model'

export default createModel((DictItemModel) => {
  DictItemModel.mixin(BaseMixin)
    .string('label', { comments: ['// 字典项键名'] })
    .string('value', { comments: ['// 字典项值'] })
    .int('status', { optional: true, default: 0, comments: ['// 状态'] })
    .string('remark', { optional: true, comments: ['// 备注'] })
    .int('sort', { optional: true, default: 0 })
    .relation('type', DictTypeModel, { fields: ['typeId'], references: ['id'] })
    .int('typeId', { map: 'type_id' })
    .map('sys_dict_item')
})
