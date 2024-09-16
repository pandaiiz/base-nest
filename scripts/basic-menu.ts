export const basicMenu: any = [
  {
    name: '首页',
    path: '/',
    sort: 1
  },
  {
    name: '系统管理',
    path: '/system',
    sort: 2,
    children: [
      {
        name: '用户管理',
        path: '/system/user',
        component: 'system/user/index',
        permission: 'system:user'
      },
      {
        name: '角色管理',
        path: '/system/role',
        component: 'system/role/index',
        permission: 'system:role'
      },
      {
        name: '菜单管理',
        path: '/system/menu',
        component: 'system/menu/index',
        permission: 'system:menu'
      },
      {
        name: '字典管理',
        path: '/system/dict/type',
        component: 'system/dict-type/index',
        permission: 'system:dict-type'
      },
      {
        name: '字典项管理',
        path: '/system/dict/type/:id',
        component: 'system/dict-item/index',
        permission: 'system:dict-item',
        hide: true
      },
      {
        name: '部门管理',
        path: '/system/dept',
        component: 'system/dept/index',
        permission: 'system:dept'
      }
    ]
  },
  {
    name: '关系管理',
    path: '/relationship',
    sort: 3,
    children: [
      {
        name: '供应商管理',
        path: '/relationship/supplier',
        component: 'relationship/supplier/index',
        permission: 'relationship:supplier'
      },
      {
        name: '员工管理',
        path: '/relationship/employee',
        component: 'relationship/employee/index',
        permission: 'relationship:employee'
      },
      {
        name: '客户管理',
        path: '/relationship/customer',
        component: 'relationship/customer/index',
        permission: 'relationship:customer'
      }
    ]
  },
  // 生产管理
  {
    name: '生产管理',
    path: '/production',
    sort: 4,
    children: [
      {
        name: '生产计划',
        path: '/production/plan',
        component: 'production/plan/index',
        permission: 'production:plan'
      },
      {
        name: '生产订单',
        path: '/production/order',
        component: 'production/order/index',
        permission: 'production:order'
      },
      {
        name: '生产进度',
        path: '/production/progress',
        component: 'production/progress/index',
        permission: 'production:progress'
      },
      {
        name: '收发记录',
        path: '/production/record',
        component: 'production/record/index',
        permission: 'production:record'
      }
    ]
  },
  // 收发管理
  {
    name: '收发管理',
    path: '/io',
    sort: 5,
    children: [
      {
        name: '收发单列表',
        path: '/io/order',
        component: 'io/order/index',
        permission: 'io:order'
      },
      {
        name: '收发记录',
        path: '/io/records',
        component: 'io/records/index',
        permission: 'io:records'
      },
      {
        name: '废品列表',
        path: '/io/rubbish',
        component: 'io/rubbish/index',
        permission: 'io:rubbish'
      },
      {
        name: '原料管理',
        path: '/io/material',
        component: 'io/material/index',
        permission: 'io:material'
      },
      {
        name: '刀具管理',
        path: '/io/knife-tool',
        component: 'io/knife-tool/index',
        permission: 'io:knife-tool'
      },
      {
        name: '收发统计',
        path: '/io/statistic',
        component: 'io/statistic/index',
        permission: 'io:statistic'
      }
    ]
  },
  // 报表
  {
    name: '报表',
    path: '/report',
    sort: 6,
    children: [
      {
        name: '刀具报表',
        path: '/report/knife-tool',
        component: 'report/knife-tool/index',
        permission: 'io:knife-tool:report'
      }
    ]
  },
  // 系统工具
  {
    name: '系统工具',
    path: '/tool',
    sort: 7,
    children: [
      {
        name: '存储管理',
        path: '/tool/storage',
        component: 'tool/storage/index',
        permission: 'tool:storage'
      }
    ]
  }
]
