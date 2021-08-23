'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:8899/crm/api"'
  // BASE_API: '"http://58.211.58.105:9099/crm/api"'
  BASE_API: '"http://localhost:8899/crm/api"'
})
