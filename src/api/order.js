import request from '@/util/request'
let qs = require('qs')
export function save (item) {
  return request.post('/order/save', item)
}

export function findList (params = { name, page, size, sort}) {
  return request.get('/order/findList', {
    params: params
  })
}

export function findById (id) {
  return request.get('/order/findById', {
    params: {
      id: id
    }
  })
}

export function deleteById (id) {
  return request.post('/order/deleteById',
    qs.stringify({id: id})
  )
}

export function deleteByIds (ids) {
  return request.post('/order/deleteByIds', ids)
}
