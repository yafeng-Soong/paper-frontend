import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    baseUrl:'http://39.108.138.143:8082'
  },
  mutations: {
    SET_CURRENT_USER: (state, payload) => {
      //刷新后state中的数据就没有了，所以对于当前用户数据来说可以考虑存到session中
      sessionStorage.setItem("currentUser",JSON.stringify(payload))
      state.currentUser = payload
    }
  },
  getters: {
    getCurrentUser: (state) => {
      if (!state.currentUser)
        state.currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
      return state.currentUser
    },
    getBaseUrl: state => state.baseUrl
  },
  actions: {
  },
  modules: {
  }
})
