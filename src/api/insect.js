import request from '@/utils/request'

export function getInsectList(params) {
  return request({
    url: '/insect-info/list-web',
    method: 'get',
    params
  })
}

export function addInsect(params) {
  return request({
    url: '/insect-info/insect-add',
    headers: {
      'Content-Type': 'multipart/form-data' // 文件上传时的格式
    },
    method: 'post',
    params
  })
}

export function getInsectById(params) {
  return request({
    url: '/insect-info/insect-web',
    method: 'get',
    params
  })
}

export function deleteInsectPic(params) {
  return request({
    url: '/insect-info/insect-pic-delete',
    method: 'get',
    params
  })
}

export function updateInsect(params) {
  return request({
    url: '/insect-info/insect-update',
    method: 'get',
    params
  })
}

export function getInsectOrderList(params) {
  return request({
    url: '/insect-order/get-orders',
    method: 'get',
    params
  })
}

export function orderOption(params) {
  return request({
    url: '/insect-order/option',
    method: 'get',
    params
  })
}
