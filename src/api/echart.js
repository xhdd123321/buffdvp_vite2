import request from '@/utils/request'

export const EchartCreate = (data) => {
  return request({
    url: '/echart_api/echart/',
    method: 'post',
    data
  })
}
