// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import lodash from 'lodash'
import * as global from './util/global'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'
import 'animate.css'

import './assets/fancybox/jquery.fancybox.min'
import './assets/fancybox/jquery.fancybox.min.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import AppComps from './components'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI, {size: 'small'})
Vue.use(AppComps)


Object.keys(global).forEach((key) => {
  Vue.prototype[key] = global[key];
})

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });
Vue.prototype.tableSize = "small"

router.beforeEach(function(to, from, next){
  NProgress.start();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    store.dispatch('isAuthed').then((token) => {
      if (!token) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    });
  } else {
    next() // 确保一定要调用 next()
  }
});
router.afterEach(function(transition){
  NProgress.done();
});

/* eslint-disable no-new */
var vueapp = new Vue({
  el: '#app1',
  router,
  store,
  components: { App },
  template: '<App/>'
})

window.vueapp = vueapp;
