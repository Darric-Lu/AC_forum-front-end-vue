import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ""
  },
  //commit 發動 action
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      // 在 stroe 存入 token
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ""
      localStorage.removeItem('token')
    }
  },
  //dispatch 發動 action
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser()

        const { id, name, email, image, isAdmin } = data
        commit('setCurrentUser', {
          id, name, email, image, isAdmin
        })
        return true
      } catch (error) {

        commit("revokeAuthentication")
        return false
      }
    },
  },
  modules: {
  },
})
