import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 1000
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
