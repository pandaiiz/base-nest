import { ForbiddenException } from '@nestjs/common'

import { envBoolean } from '~/global/env'

import { uniqueSlash } from './tool.util'
import { Menu, Role } from '@prisma/client'

export interface RouteRecordRaw {
  id: number
  path: string
  name: string
  component?: string
  redirect?: string
  hideChildrenInMenu?: boolean
  hideInMenu?: boolean
  meta: {
    title: string
    icon: string
    type: string
    sort: number
    show: number
    status: number
  }
  children?: RouteRecordRaw[]
}

function createRoute(menu: Menu): RouteRecordRaw {
  const commonMeta: RouteRecordRaw['meta'] = {
    title: menu.name,
    icon: menu.icon,
    type: menu.type,
    sort: menu.sort,
    show: menu.show,
    status: menu.status
  }

  // 目录
  if (menu.type === 'CATALOG') {
    return {
      id: menu.id,
      path: menu.path,
      component: menu.component,
      name: menu.name,
      hideChildrenInMenu: menu.show === 0,
      hideInMenu: menu.show === 0,
      meta: { ...commonMeta }
    }
  }

  return {
    id: menu.id,
    path: menu.path,
    name: menu.name,
    component: menu.component,
    hideChildrenInMenu: menu.show === 0,
    hideInMenu: menu.show === 0,
    meta: {
      ...commonMeta
    }
  }
}

function filterAsyncRoutes(menus: Menu[], parentRoute: Menu): RouteRecordRaw[] {
  const res: RouteRecordRaw[] = []
  menus.forEach((menu) => {
    if (menu.type === 'ACCESS' || !menu.status) {
      // 如果是权限或禁用直接跳过
      return
    }
    // 根级别菜单渲染
    let realRoute: RouteRecordRaw

    const genFullPath = (path: string, parentPath: string) => {
      return uniqueSlash(path.startsWith('/') ? path : `/${parentPath}/${path}`)
    }

    if (!parentRoute && !menu.parentId && menu.type === 'MENU') {
      // 根菜单
      realRoute = createRoute(menu)
    } else if (!parentRoute && !menu.parentId && menu.type === 'CATALOG') {
      // 目录
      const childRoutes = filterAsyncRoutes(menus, menu)
      realRoute = createRoute(menu)
      if (childRoutes && childRoutes.length > 0) {
        realRoute.redirect = genFullPath(childRoutes[0].path, realRoute.path)
        realRoute.children = childRoutes
      }
    } else if (parentRoute && parentRoute.id === menu.parentId && menu.type === 'MENU') {
      // 子菜单
      realRoute = createRoute(menu)
    } else if (parentRoute && parentRoute.id === menu.parentId && menu.type === 'CATALOG') {
      // 如果还是目录，继续递归
      const childRoutes = filterAsyncRoutes(menus, menu)
      realRoute = createRoute(menu)
      if (childRoutes && childRoutes.length > 0) {
        realRoute.redirect = genFullPath(childRoutes[0].path, realRoute.path)
        realRoute.children = childRoutes
      }
    }
    if (realRoute) res.push(realRoute)
  })
  return res
}

export function generatorRouters(menus: Menu[]) {
  return filterAsyncRoutes(menus, null)
}

// 获取所有菜单以及权限
function filterMenuToTable(menus: Menu[], parentMenu: Menu) {
  const res = []
  menus.forEach((menu) => {
    // 根级别菜单渲染
    let realMenu: {
      children?: any
      pid?: any
      parentId?: number
      name?: string
      path?: string
      permission?: string
      type?: string
      icon?: string
      component?: string
      show?: number
      status?: number
      roles?: Role[]
      id?: number
      createdAt?: Date
      updatedAt?: Date
    }
    if (!parentMenu && !menu.parentId && menu.type === 'MENU') {
      // 根菜单，查找该跟菜单下子菜单，因为可能会包含权限
      const childMenu = filterMenuToTable(menus, menu)
      realMenu = { ...menu }
      realMenu.children = childMenu
    } else if (!parentMenu && !menu.parentId && menu.type === 'CATALOG') {
      // 根目录
      const childMenu = filterMenuToTable(menus, menu)
      realMenu = { ...menu }
      realMenu.children = childMenu
    } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === 'MENU') {
      // 子菜单下继续找是否有子菜单
      const childMenu = filterMenuToTable(menus, menu)
      realMenu = { ...menu }
      realMenu.children = childMenu
    } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === 'CATALOG') {
      // 如果还是目录，继续递归
      const childMenu = filterMenuToTable(menus, menu)
      realMenu = { ...menu }
      realMenu.children = childMenu
    } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === 'ACCESS') {
      realMenu = { ...menu }
    }
    if (realMenu) {
      realMenu.pid = menu.id
      res.push(realMenu)
    }
  })
  return res
}

export function generatorMenu(menu: any[]) {
  return filterMenuToTable(menu, null)
}

/** 检测是否为演示环境, 如果为演示环境，则拒绝该操作 */
export function checkIsDemoMode() {
  if (envBoolean('IS_DEMO')) throw new ForbiddenException('演示模式下不允许操作')
}
