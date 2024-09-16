import { PrismaClient } from '@prisma/client'
import { basicMenu } from './basic-menu'
import { MD5 } from 'crypto-js'
import { genKnifeTools } from './generateKnifeTools'

const prisma = new PrismaClient()
const ACCESS_LIST = [
  { type: 'create', name: '新增' },
  { type: 'delete', name: '删除' },
  { type: 'update', name: '修改' },
  { type: 'query', name: '查询' }
]
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
      for (const menuChild of menu.children) {
        const createdMenu = await prisma.menu.create({
          data: {
            name: menuChild.name,
            path: menuChild.path,
            parentId: parent.id,
            type: 'MENU',
            permission: menuChild.permission,
            component: menuChild.component,
            show: menuChild.hide ? 0 : 1
          }
        })
        await prisma.menu.createMany({
          data: ACCESS_LIST.map((item: any) => ({
            name: item.name,
            parentId: createdMenu.id,
            type: 'ACCESS',
            permission: menuChild.permission + ':' + item.type,
            show: item.hide ? 0 : 1
          }))
        })
      }
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
  const ioRole = await prisma.role.create({
    data: {
      name: '收发',
      value: 'io',
      remark: '收发'
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
  await prisma.user.create({
    data: {
      username: 'shoufa',
      password,
      nickname: '收发',
      salt,
      roles: {
        connect: {
          id: ioRole.id
        }
      }
    }
  })
}
const generateSupplier = async () => {
  await prisma.supplier.createMany({
    data: [
      { name: '誉和', code: 'GYS_YH' },
      { name: '超钻', code: 'GYS_CZ' },
      { name: '赛锐锋', code: 'GYS_SRF' }
    ]
  })
}
const generateDepartment = async () => {
  await prisma.dept.createMany({
    data: [
      { name: 'CNC A组', sort: 1 },
      { name: 'CNC B组', sort: 2 },
      { name: 'CNC C组', sort: 3 },
      { name: 'CNC D组', sort: 4 },
      { name: '收发', sort: 5 }
    ]
  })
}
Promise.all([
  generateMenu(),
  generateUser(),
  genKnifeTools(),
  generateSupplier(),
  generateDepartment()
]).then(() => console.log('done'))
