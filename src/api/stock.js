import request from '@/util/request'
let qs = require('qs')
export function save (item) {
  return request.post('/stock/detail/save', item)
}

export function findList (params = {name, page: 1, size: 10, sort: 'order'}) {
  return request.get('/stock/detail/findList', {
    params: params
  })
}

export function findById (id) {
  return request.get('/stock/detail/findById', {
    params: {
      id: id
    }
  })
}

export function deleteById (id) {
  return request.post('/stock/detail/deleteById',
    qs.stringify({id: id})
  )
}

export function deleteByIds (ids) {
  return request.post('/stock/detail/deleteByIds', ids)
}
