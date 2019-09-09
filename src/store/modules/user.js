import {login} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth';
import rouer,{ resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}


const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
   // setToken(state.token)
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
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
}

const actions = {
  login({ commit }, userInfo){
    console.log(userInfo)
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({username: username.trim(),password: password }).then(response=>{
        const {data} = response
        console.log(data,'data')
        commit('SET_TOKEN',data.token)
        setToken(data.token)
        resolve()
      }).catch(err=>{
        console.error(err)
        reject(err)
      })
    })
  },

  getInfo({commit,state}){
    return new Promise((resolve,reject)=>{
      getInfo(state.token).then(response=>{
        const {data} = response
        if(!data){
          reject('Verification failed, please Login again.')
        }
        const {roles, name, avatar, introduction} = data
        if(!roles || roles.length <= 0){
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES',roles)
        commit('SET_NAME',name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

