import request from '@/utils/request'

export const FileCreate = (data) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  return request({
    url: '/file_api/file/',
    method: 'post',
    data,
    config
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
