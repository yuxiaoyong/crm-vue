import request from '@/util/request'
let qs = require('qs')

export function getCustomerStatusStat () {
  return request.get('/dashboard/getCustomerStatusStat', {
    params: {}
  })
}
