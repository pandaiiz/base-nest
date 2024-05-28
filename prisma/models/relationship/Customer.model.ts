import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
// import MaterialModel from './Material.model'

export default createModel((CustomerModel) => {
  CustomerModel.mixin(BaseMixin)
    .string('name')
    .string('code', { unique: true, comments: ['// 编码'] })
    // 客户和订单是一对多关系
    /*.relation('orders', MaterialModel, {
      list: true,
      comments: ['// 原料'],
      raw: '@relation("sys_material")'
    })*/
    .map('sys_customer')
})
