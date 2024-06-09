import { createModel } from 'schemix'
import BaseUuidMixin from '../../mixins/BaseUuid.mixin'
import UserModel from './User.model'
import RefreshTokenModel from './RefreshToken.model'

export default createModel((AccessTokenModel) => {
  AccessTokenModel.mixin(BaseUuidMixin)
    .string('value', { raw: '@database.VarChar(500)', unique: true })
    .dateTime('expiredAt', { map: 'expired_at', comments: ['// 令牌过期时间'] })
    // 用户和token是一对多关系
    .relation('user', UserModel, { fields: ['userId'], references: ['id'], comments: ['// 用户'] })
    .int('userId', { map: 'user_id', comments: ['// 用户ID'] })
    // accessToken和refreshToken是一对一关系
    .relation('refreshToken', RefreshTokenModel, { optional: true })
    .raw('@@index([userId])')
    .map('user_access_tokens')
})
