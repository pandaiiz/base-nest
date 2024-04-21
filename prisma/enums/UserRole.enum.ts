import { createEnum } from 'schemix'

export default createEnum((UserRoleEnum) => {
  UserRoleEnum.map('userRole').addValue('MEMBER').addValue('ADMIN')
})
