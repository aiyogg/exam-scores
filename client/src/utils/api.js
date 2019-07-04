import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data,
  })
}

export const getExamList = (params) => {
  return request({
    url: '/examList',
    method: 'GET',
    params,
  })
}

export const getExamInfo = (params) => {
  return request({
    url: '/examInfo',
    method: 'GET',
    params,
  })
}
