import request from '@/utils/request'

export const EchartCreate = (data) => {
  return request({
    url: '/echart_api/echart/',
    method: 'post',
    data
  })
}

export const AnaGetCount = (data) => {
  return request({
    url: '/echart_api/ana/count/',
    method: 'post',
    data
  })
}

export const AnaGetList = (data) => {
  return request({
    url: '/echart_api/ana/list/',
    method: 'post',
    data
  })
}
