import request from '@/utils/request'

export const getDashboardData = () => {
  return request({
    url: '/data_api/dashboard/',
    method: 'get'
  })
}
