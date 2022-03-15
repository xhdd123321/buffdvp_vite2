import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})
export default instance
