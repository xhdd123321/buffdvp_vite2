import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from './routes/modules/auth'
import About from './routes/modules/about'
import Root from './routes/modules/root'

const routes = [
  { path: '/', redirect: 'auth' },
  Auth,
  Root,
  About
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
  scrollBehavior () {
    return { top: 0 }
  }
})
export default router
