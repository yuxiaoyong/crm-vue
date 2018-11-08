import Vuex from 'vuex'
import app from './module/app'
import user from './module/user'
import Vue from "vue";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app: app,
    user: user
  },
  getters:{
    breadcrumb: state => state.app.breadcrumb,
    sidebarCollapsed: state => !state.app.sidebar.opened,
    token: state => state.user.token
  }
})
export default store
