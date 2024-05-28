import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'

export default createModel((EmployeeModel) => {
  EmployeeModel.mixin(BaseMixin)
    .string('name')
    .string('code')
    .float('piecesNumber', { optional: true, map: 'pieces_number', comments: ['// 计件数量'] })
    .dateTime('leftAt', { optional: true, map: 'left_at', comments: ['// 离职日期'] })
    .map('sys_employee')
})
