import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from './routes/modules/auth'
import About from './routes/modules/about'
import Root from './routes/modules/root'
import createRouteGuard from '@/router/guard'

const routes = [
  { path: '/', redirect: 'root' },
  Auth,
  Root,
  About,
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
  scrollBehavior () {
    return { top: 0 }
  }
})

createRouteGuard(router)

export default router
