import { PrismaClient } from '@prisma/client'
import { basicMenu } from './basic-menu'
import { MD5 } from 'crypto-js'

const prisma = new PrismaClient()

const generateMenu = async () => {
  for (const menu of basicMenu) {
    const parent = await prisma.menu.create({
      data: {
        name: menu.name,
        path: menu.path,
        sort: menu.sort,
        type: 'CATALOG'
      }
    })

    if (menu.children) {
      await prisma.menu.createMany({
        data: menu.children.map((item: any) => ({
          name: item.name,
          path: item.path,
          parentId: parent.id,
          type: 'MENU',
          permission: item.permission,
          component: item.component,
          show: item.show || 1
        }))
      })
    }
  }
}
const randomValue = (
  size = 16,
  dict = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
): string => {
  let id = ''
  let i = size
  const len = dict.length
  while (i--) id += dict[(Math.random() * len) | 0]
  return id
}
const generateUser = async () => {
  const adminRole = await prisma.role.create({
    data: {
      name: '超级管理员',
      value: 'admin',
      remark: '超级管理员'
    }
  })

  const salt = randomValue(32)
  const password = MD5(`${'a123456'}${salt}`).toString()
  await prisma.user.create({
    data: {
      username: 'admin',
      password,
      nickname: '超级管理员',
      salt,
      roles: {
        connect: {
          id: adminRole.id
        }
      }
    }
  })
}

Promise.all([generateMenu(), generateUser()]).then(() => console.log('done'))
