import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters.js'
Vue.use(Vuex)
const state = {
  name: 'kitt'
}

const mutations = {
  CHANGE_NAME : (state, { key, value }) => {
    if(state.hasOwnProperty(key)){
      state[key] = value
    }
  }
}

const actions = {
  changeName( { commit }, data){
    commit('CHANGE_NAME',data)
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    user
  }
})

export default store
