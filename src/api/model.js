import request from '@/utils/request'

export function getModelList(params) {
  return request({
    url: '/insect-classify/model-list',
    method: 'get',
    params
  })
}

export function setUsing(params) {
  return request({
    url: '/insect-classify/set-using-model',
    method: 'get',
    params
  })
}

export function deleteModel(params) {
  return request({
    url: '/insect-classify/model-delete',
    method: 'get',
    params
  })
}

export function training(params) {
  return request({
    url: '/insect-classify/training-model',
    method: 'get',
    params
  })
}
