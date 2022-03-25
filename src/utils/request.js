import axios from 'axios'
import { getToken } from '@/utils/auth'
import router from '@/router'
import { useUserStore } from '@/store/userStore'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    if (!config.headers) {
      config.headers = {}
    }
    config.headers['X-CSRFToken'] = token
  }
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  return response
}, err => {
  if (err.response.status === 401) {
    const userStore = useUserStore()
    userStore.logout()
    router.push({ name: 'login' })
  }
  return Promise.reject(err.response)
})
export default instance
