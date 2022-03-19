export default {
  path: '/root',
  name: 'root',
  component: () => import('@/views/root/index.vue'),
  meta: {
    requiresAuth: true,
    requiresAdmin: false
  },
  children: [
    {
      path: '',
      redirect: { name: 'home' },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'home',
      name: 'home',
      component: () => import('@/views/root/body/home/index.vue'),
      meta: {
        title: '首页',
        requiresAuth: true,
        requiresAdmin: false,
        icon: 'HomeFilled'
      }
    },
    {
      path: 'data',
      name: 'data',
      component: () => import('@/views/root/body/data/index.vue'),
      meta: {
        title: '数据中心',
        requiresAuth: true,
        requiresAdmin: false,
        icon: 'grid'
      },
      children: [
        {
          path: '',
          redirect: { name: 'dataOne' },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'data-one',
          name: 'dataOne',
          component: () => import('@/views/root/body/data/dataOne.vue'),
          meta: {
            title: '数据中心one',
            requiresAuth: true,
            requiresAdmin: false
          }
        },
        {
          path: 'data-Two',
          name: 'dataTwo',
          component: () => import('@/views/root/body/data/dataTwo.vue'),
          meta: {
            requiresAuth: true,
            requiresAdmin: false
          }
        }
      ]
    },
    {
      path: 'echart',
      name: 'echart',
      component: () => import('@/views/root/body/echart/index.vue'),
      meta: {
        title: '可视化',
        requiresAuth: true,
        requiresAdmin: false,
        icon: 'histogram'
      },
      children: [
        {
          path: '',
          redirect: { name: 'echartOne' },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'echart-one',
          name: 'echartOne',
          component: () => import('@/views/root/body/echart/echartOne.vue'),
          meta: {
            requiresAuth: true,
            requiresAdmin: false
          }
        },
        {
          path: 'echart-Two',
          name: 'echartTwo',
          component: () => import('@/views/root/body/echart/echartTwo.vue'),
          meta: {
            requiresAuth: true,
            requiresAdmin: false
          }
        }
      ]
    },
    {
      path: 'file',
      name: 'file',
      component: () => import('@/views/root/body/file/index.vue'),
      meta: {
        title: '文件中心',
        requiresAuth: true,
        requiresAdmin: false,
        icon: 'files'
      },
      children: [
        {
          path: '',
          redirect: { name: 'fileOne' },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'file-one',
          name: 'fileOne',
          component: () => import('@/views/root/body/file/fileOne.vue'),
          meta: {
            requiresAuth: true,
            requiresAdmin: false
          }
        },
        {
          path: 'file-Two',
          name: 'fileTwo',
          component: () => import('@/views/root/body/file/fileTwo.vue'),
          meta: {
            requiresAuth: true,
            requiresAdmin: false
          }
        }
      ]
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/root/body/user/index.vue'),
      meta: {
        title: '用户中心',
        requiresAuth: true,
        requiresAdmin: false,
        icon: 'user'
      },
      children: [
        {
          path: '',
          redirect: { name: 'adminUserOne' },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'user-info',
          name: 'userInfo',
          component: () => import('@/views/root/body/user/userInfo.vue'),
          meta: {
            title: '个人信息',
            requiresAuth: true,
            requiresAdmin: false
          }
        },
        {
          path: 'user-setting',
          name: 'userSetting',
          component: () => import('@/views/root/body/user/userSetting.vue'),
          meta: {
            title: '用户设置',
            requiresAuth: true,
            requiresAdmin: false
          }
        },
        {
          path: 'admin-user',
          name: 'adminUser',
          component: () => import('@/views/root/body/user/adminUser.vue'),
          meta: {
            title: '用户管理',
            requiresAuth: true,
            requiresAdmin: true
          }
        }
      ]
    },
    {
      path: 'settings',
      name: 'settings',
      component: () => import('@/views/root/body/settings/index.vue'),
      meta: {
        title: '设置',
        requiresAuth: true,
        requiresAdmin: false,
        icon: 'setting'
      }
    }
  ]
}
