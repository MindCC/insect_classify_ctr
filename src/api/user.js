import request from '@/utils/request'

export function login(params) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/user/login',
    method: 'post',
    params
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-admin-template/user/info',
    url: '/user/token-get-info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
