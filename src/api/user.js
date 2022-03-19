import request from '@/utils/request'

export const Login = (data) => {
  return request({
    url: '/user_api/login/',
    method: 'post',
    data
  })
}

export const Logout = () => {
  return request({
    url: '/user_api/logout/',
    method: 'delete'
  })
}

export const UserCreate = (data) => {
  return request({
    url: '/user_api/user/',
    method: 'post',
    data
  })
}

export const UserList = (params) => {
  return request({
    url: '/user_api/user/',
    method: 'get',
    params
  })
}

export const UserRetrieve = (pk) => {
  return request({
    url: `/user_api/user/${pk}/`,
    method: 'get'
  })
}

export const UserUpdate = (pk, data) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  return request({
    url: `/user_api/user/${pk}/`,
    method: 'patch',
    data,
    config
  })
}

export const UserDelete = (pk) => {
  return request({
    url: `/user_api/user/${pk}/`,
    method: 'delete'
  })
}
