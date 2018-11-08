import * as authc from '../../api/authc'
import router from '../../router'
import cookie from "js-cookie";

const user = {
  state: {
    token: '',
    user: {

    },
    roles: []
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {

    signIn({ commit }, { username, password }){
      return authc.signIn({ username, password }).then((res) => {
        commit('SET_TOKEN', res.data.access_token);
        cookie.set('token', res.data.access_token, { expires: 7, path: '' })
        return res.data.access_token;
      });
    },

    signOut({ commit }){
      return authc.signOut().then((res) => {
        commit('SET_TOKEN', null);
        cookie.remove('token');
        router.push({ path: "/login" });
      }).catch(() => {
        commit('SET_TOKEN', null);
      });
    },

    isAuthed({ commit, state }){
      var token = state.token;
      if(!token){
        token = cookie.get('token');
      }
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', token);
        resolve(token);
      });
    }

  }
}

export default user
