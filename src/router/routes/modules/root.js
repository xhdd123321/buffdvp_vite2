export default {
  path: '/root',
  name: 'root',
  component: () => import('@/views/root/index.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      path: '',
      redirect: { name: 'home' }
    },
    {
      path: 'home',
      name: 'home',
      component: () => import('@/views/root/body/home/index.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: 'data',
      name: 'data',
      component: () => import('@/views/root/body/data/index.vue'),
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '',
          redirect: { name: 'dataOne' }
        },
        {
          path: 'data-one',
          name: 'dataOne',
          component: () => import('@/views/root/body/data/dataOne.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'data-Two',
          name: 'dataTwo',
          component: () => import('@/views/root/body/data/dataTwo.vue'),
          meta: {
            requiresAuth: false
          }
        }
      ]
    },
    {
      path: 'echart',
      name: 'echart',
      component: () => import('@/views/root/body/echart/index.vue'),
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '',
          redirect: { name: 'echartOne' }
        },
        {
          path: 'echart-one',
          name: 'echartOne',
          component: () => import('@/views/root/body/echart/echartOne.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'echart-Two',
          name: 'echartTwo',
          component: () => import('@/views/root/body/echart/echartTwo.vue'),
          meta: {
            requiresAuth: false
          }
        }
      ]
    },
    {
      path: 'file',
      name: 'file',
      component: () => import('@/views/root/body/file/index.vue'),
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '',
          redirect: { name: 'fileOne' }
        },
        {
          path: 'file-one',
          name: 'fileOne',
          component: () => import('@/views/root/body/file/fileOne.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'file-Two',
          name: 'fileTwo',
          component: () => import('@/views/root/body/file/fileTwo.vue'),
          meta: {
            requiresAuth: false
          }
        }
      ]
    },
    {
      path: 'settings',
      name: 'settings',
      component: () => import('@/views/root/body/settings/index.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ]
}
