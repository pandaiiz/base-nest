import { createEnum } from 'schemix'

export default createEnum((MenuTypeEnum) => {
  MenuTypeEnum.addValue('CATALOG').addValue('MENU').addValue('ACCESS')
})
