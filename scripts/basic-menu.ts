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
        permission: 'system:user:list'
      },
      {
        name: '角色管理',
        path: '/system/role',
        component: 'system/role/index',
        permission: 'system:role:list'
      },
      {
        name: '菜单管理',
        path: '/system/menu',
        component: 'system/menu/index',
        permission: 'system:menu:list'
      },
      {
        name: '字典管理',
        path: '/system/dict/type',
        component: 'system/dict-type/index',
        permission: 'system:dict-type:list'
      },
      {
        name: '字典项管理',
        path: '/system/dict/type/:id',
        component: 'system/dict-item/index',
        permission: 'system:dict-item:list',
        hide: true
      },
      {
        name: '部门管理',
        path: '/system/dept',
        component: 'system/dept/index',
        permission: 'system:dept:list'
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
        permission: 'relationship:supplier:list'
      },
      {
        name: '原料管理',
        path: '/relationship/material',
        component: 'relationship/material/index',
        permission: 'relationship:material:list'
      },
      {
        name: '刀具管理',
        path: '/relationship/tool',
        component: 'relationship/tool/index',
        permission: 'relationship:tool:list'
      },
      {
        name: '员工管理',
        path: '/relationship/employee',
        component: 'relationship/employee/index',
        permission: 'relationship:employee:list'
      },
      {
        name: '客户管理',
        path: '/relationship/customer',
        component: 'relationship/customer/index',
        permission: 'relationship:customer:list'
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
        permission: 'production:plan:list'
      },
      {
        name: '生产订单',
        path: '/production/order',
        component: 'production/order/index',
        permission: 'production:order:list'
      },
      {
        name: '生产进度',
        path: '/production/progress',
        component: 'production/progress/index',
        permission: 'production:progress:list'
      },
      {
        name: '收发记录',
        path: '/production/record',
        component: 'production/record/index',
        permission: 'production:record:list'
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
        permission: 'io:order:list'
      },
      {
        name: '收发记录',
        path: '/io/records',
        component: 'io/records/index',
        permission: 'io:records:list'
      },
      {
        name: '废品列表',
        path: '/io/rubbish',
        component: 'io/rubbish/index',
        permission: 'io:rubbish:list'
      },
      {
        name: '收发统计',
        path: '/io/statistic',
        component: 'io/statistic/index',
        permission: 'io:statistic:list'
      }
    ]
  },
  // 系统工具
  {
    name: '系统工具',
    path: '/tool',
    sort: 6,
    children: [
      {
        name: '存储管理',
        path: '/tool/storage',
        component: 'tool/storage/index',
        permission: 'tool:storage:list'
      }
    ]
  }
]
