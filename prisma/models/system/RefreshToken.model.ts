import { createModel } from 'schemix'
import BaseUuidMixin from '../../mixins/BaseUuid.mixin'
import AccessTokenModel from './AccessToken.model'

export default createModel((RefreshTokenModel) => {
  RefreshTokenModel.mixin(BaseUuidMixin)
    .string('value', { raw: '@database.VarChar(500)' })
    .dateTime('expiredAt', { map: 'expired_at', comments: ['// 令牌过期时间'] })
    .relation('accessToken', AccessTokenModel, {
      fields: ['accessTokenId'],
      references: ['id'],
      comments: ['// 刷新令牌']
    })
    .string('accessTokenId', {
      map: 'access_token_id',
      comments: ['// 刷新令牌ID'],
      unique: true
    })
    .map('user_refresh_tokens')
})
