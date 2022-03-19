import request from '@/utils/request'

export const FileCreate = (data) => {
  return request({
    url: '/file_api/file/',
    method: 'post',
    data
  })
}

export const FileList = (params) => {
  return request({
    url: '/file_api/file/',
    method: 'get',
    params
  })
}

export const FileRetrieve = (pk) => {
  return request({
    url: `/file_api/file/${pk}/`,
    method: 'get'
  })
}

export const FileDelete = (pk) => {
  return request({
    url: `/file_api/file/${pk}/`,
    method: 'delete'
  })
}
