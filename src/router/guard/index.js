import { isLogin } from '@/utils/auth'

function setupPageGuard (router) {
  router.beforeEach(async (to, from, next) => {
    // emit route change
    if (to.name !== 'login' && to.meta.requiresAuth && !isLogin()) {
      next({ name: 'login' })
    } else {
      next()
    }
  })
}

export default function createRouteGuard (router) {
  setupPageGuard(router)
  // setupPermissionGuard(router)
}
