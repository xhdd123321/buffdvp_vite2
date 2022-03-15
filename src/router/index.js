import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/index.vue'),
    meta: {
      requireAuth: true,
      breadNumber: 1
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/Home/body/index.vue'),
        meta: {
          requireAuth: true,
          breadNumber: 2
        }
      },
      {
        path: 'fileOne',
        name: 'fileOne',
        component: () => import('../views/Home/body/file/fileOne.vue'),
        meta: {
          requireAuth: true,
          breadNumber: 2
        }
      },
      {
        path: 'fileTwo',
        name: 'fileTwo',
        component: () => import('../views/Home/body/file/fileTwo.vue'),
        meta: {
          requireAuth: true,
          breadNumber: 2
        }
      },
      {
        path: 'dataOne',
        name: 'dataOne',
        component: () => import('../views/Home/body/data/dataOne.vue'),
        meta: {
          requireAuth: true,
          breadNumber: 2
        }
      },
      {
        path: 'dataTwo',
        name: 'dataTwo',
        component: () => import('../views/Home/body/data/dataTwo.vue'),
        meta: {
          requireAuth: true,
          breadNumber: 2
        }
      },
      {
        path: 'echartOne',
        name: 'echartOne',
        component: () => import('../views/Home/body/echart/echartOne.vue'),
        meta: {
          requireAuth: true,
          breadNumber: 2
        }
      },
      {
        path: 'echartTwo',
        name: 'echartTwo',
        component: () => import('../views/Home/body/echart/echartTwo.vue'),
        meta: {
          requireAuth: true,
          breadNumber: 2
        }
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('../views/Home/body/index.vue'),
        meta: {
          requireAuth: true,
          breadNumber: 2
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})
export default router
