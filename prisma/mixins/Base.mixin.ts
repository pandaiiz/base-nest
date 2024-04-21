import { createMixin } from 'schemix'

export default createMixin((BaseMixin) => {
  BaseMixin.int('id', { id: true, default: { autoincrement: true } })
    .dateTime('createdAt', { default: { now: true }, map: 'created_at' })
    .dateTime('updatedAt', { updatedAt: true, map: 'updated_at' })
})
