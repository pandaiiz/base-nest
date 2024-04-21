import { createMixin } from 'schemix'

export default createMixin((BaseUuidMixin) => {
  BaseUuidMixin.string('id', { id: true, default: { uuid: true }, raw: '@database.Uuid' })
    .dateTime('createdAt', { default: { now: true }, map: 'created_at' })
    .dateTime('updatedAt', { updatedAt: true, map: 'updated_at' })
})
