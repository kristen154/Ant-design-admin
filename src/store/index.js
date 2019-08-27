import Vue from 'vue'
import Vuex from 'vuex'


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
  actions
})

export default store
