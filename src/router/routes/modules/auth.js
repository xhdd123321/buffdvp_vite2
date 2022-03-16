export default {
  path: '/auth',
  name: 'auth',
  component: () => import('@/views/auth/index.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      path: '',
      redirect: { name: 'login' }
    },
    {
      path: 'login',
      name: 'login',
      component: () => import('@/views/auth/login/index.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/views/auth/register/index.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ]
}
