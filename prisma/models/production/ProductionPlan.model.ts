import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import StatusEnum from '../../enums/Status.enum'
// import MaterialModel from './Material.model'

export default createModel((ProductionPlanModel) => {
  ProductionPlanModel.mixin(BaseMixin)
    .int('quantity', { comments: ['// 数量'] })
    .enum('status', StatusEnum)
    .string('code', { unique: true, comments: ['// 编码'] })
    // 客户和订单是一对多关系
    /*.relation('orders', MaterialModel, {
      list: true,
      comments: ['// 原料'],
      raw: '@relation("sys_material")'
    })*/
    .map('sys_production_plan')
})
