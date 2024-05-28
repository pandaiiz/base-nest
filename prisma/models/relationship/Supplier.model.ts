import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import MaterialModel from './Material.model'

export default createModel((SupplierModel) => {
  SupplierModel.mixin(BaseMixin)
    .string('name')
    .string('code', { unique: true, comments: ['// 编码'] })
    // 供应商和原料是多对多关系
    .relation('materials', MaterialModel, {
      list: true,
      comments: ['// 原料'],
      raw: '@relation("sys_supplier_material")'
    })
    .map('sys_supplier')
})
