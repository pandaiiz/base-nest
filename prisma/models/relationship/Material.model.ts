import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import SupplierModel from './Supplier.model'

export default createModel((MaterialModel) => {
  MaterialModel.mixin(BaseMixin)
    .string('name')
    .string('code', { unique: true, optional: true, comments: ['// 编码'] })
    .string('remark', { optional: true, comments: ['// 备注'] })
    .string('unit', { optional: true, comments: ['// 单位'] })
    .float('stock', { default: 0, comments: ['// 库存'] })
    // 供应商和原料是多对多关系
    .relation('suppliers', SupplierModel, {
      list: true,
      comments: ['// 供应商'],
      raw: '@relation("sys_supplier_material")'
    })
    .map('sys_material')
})
