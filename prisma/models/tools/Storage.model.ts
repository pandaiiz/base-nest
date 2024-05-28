import { createModel } from 'schemix'
import BaseMixin from '../../mixins/Base.mixin'
import UserModel from '../system/User.model'

export default createModel((StorageModel) => {
  StorageModel.mixin(BaseMixin)
    .string('name', { comments: ['// 文件名'] })
    .string('fileName', { optional: true, comments: ['// 真实文件名'] })
    .string('extName', { optional: true, map: 'ext_name', comments: ['// 扩展名'] })
    .string('path', { comments: ['// 文件路径'] })
    .string('type', { optional: true, comments: ['// 文件类型'] })
    .string('size', { optional: true, comments: ['// 文件大小'] })
    .int('userId', { optional: true, map: 'user_id', comments: ['// 用户ID'] })
    .relation('user', UserModel, { optional: true, fields: ['userId'], references: ['id'] })
    .raw('@@index([userId])')
    .map('tool_storage')
})
