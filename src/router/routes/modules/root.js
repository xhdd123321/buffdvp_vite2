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
        icon: 'icon-home'
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
        icon: 'icon-common'
      },
      children: [
        {
          path: '',
          redirect: { name: 'chartList' },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'chart-list',
          name: 'chartList',
          component: () => import('@/views/root/body/data/chartList.vue'),
          meta: {
            title: '图表列表',
            requiresAuth: true,
            requiresAdmin: false
          }
        },
        {
          path: 'chart-detail/:id',
          name: 'chartDetail',
          component: () => import('@/views/root/body/data/chartDetail.vue'),
          meta: {
            isHidden: true,
            title: '图表详情',
            requiresAuth: true,
            requiresAdmin: false
          }
        }
        // {
        //   path: 'data-Two',
        //   name: 'dataTwo',
        //   component: () => import('@/views/root/body/data/dataTwo.vue'),
        //   meta: {
        //     requiresAuth: true,
        //     requiresAdmin: false
        //   }
        // }
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
        icon: 'icon-bar-chart'
      },
      children: [
        {
          path: '',
          redirect: { name: 'echartCustom' },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'echart-Custom',
          name: 'echartCustom',
          component: () => import('@/views/root/body/echart/echartCustom.vue'),
          meta: {
            title: '自定义分析',
            requiresAuth: true,
            requiresAdmin: false
          }
        },
        {
          path: 'echart-result',
          name: 'echartResult',
          component: () => import('@/views/root/body/echart/echartResult.vue'),
          meta: {
            isHidden: true,
            title: '分析结果',
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
          redirect: { name: 'fileList' },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'file-list',
          name: 'fileList',
          component: () => import('@/views/root/body/file/fileList.vue'),
          meta: {
            title: '文件列表',
            requiresAuth: true,
            requiresAdmin: false
          }
        }
        // {
        //   path: 'file-Two',
        //   name: 'fileTwo',
        //   component: () => import('@/views/root/body/file/fileTwo.vue'),
        //   meta: {
        //     requiresAuth: true,
        //     requiresAdmin: false
        //   }
        // }
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
          redirect: { name: 'userInfo' },
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
          path: 'admin-user',
          name: 'adminUser',
          component: () => import('@/views/root/body/user/adminUser.vue'),
          meta: {
            title: '用户管理',
            requiresAuth: true,
            requiresAdmin: true
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
        }
      ]
    },
    {
      path: 'help',
      name: 'help',
      component: () => import('@/views/root/body/help/index.vue'),
      meta: {
        title: '帮助文档',
        requiresAuth: true,
        requiresAdmin: false,
        icon: 'help'
      },
      children: [
        {
          path: '',
          redirect: { name: 'quickStart' },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'quick-start',
          name: 'quickStart',
          component: () => import('@/views/root/body/help/quickStart.vue'),
          meta: {
            title: '快速开始',
            requiresAuth: true,
            requiresAdmin: false
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
