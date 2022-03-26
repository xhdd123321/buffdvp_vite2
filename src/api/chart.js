import request from '@/utils/request'

export const ChartCreate = (data) => {
  return request({
    url: '/data_api/chart/',
    method: 'post',
    data
  })
}

export const ChartList = (params) => {
  return request({
    url: '/data_api/chart/',
    method: 'get',
    params
  })
}

export const ChartRetrieve = (pk) => {
  return request({
    url: `/data_api/chart/${pk}/`,
    method: 'get'
  })
}

export const ChartDelete = (pk) => {
  return request({
    url: `/data_api/chart/${pk}/`,
    method: 'delete'
  })
}

export const ChartExport = (pk, params) => {
  return request({
    url: `/data_api/chart/${pk}/export/`,
    method: 'get',
    responseType: 'blob',
    params
  })
}
