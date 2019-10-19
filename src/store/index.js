import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser:{},
    baseUrl:'http://39.108.138.143:8082'
  },
  mutations: {
    SET_CURRENT_USER: (state, payload) => {
      state.userInfo = payload
    },
  },
  getters: {
    getCurrentUser: (state) => state.userInfo,
    getBaseUrl: state => state.baseUrl
  },
  actions: {
  },
  modules: {
  }
})
