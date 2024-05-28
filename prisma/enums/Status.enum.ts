import { createEnum } from 'schemix'

export default createEnum((StatusEnum) => {
  StatusEnum.addValue('PLANING').addValue('IN_PRODUCTION').addValue('COMPLETED')
})
