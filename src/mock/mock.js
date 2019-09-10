const Mock = require('mockjs')
import {URLPATH, USER_URL} from '@/requrl.js'
Mock.mock(USER_URL.LOGIN.url,(req, res) => {
  return {
    data:{
      token:'ddt'
    }
  }
})


Mock.mock(USER_URL.GETINFO.url,(req,res)=>{
  return {roles:['admin'], name:'kitt', avatar:'ava', introduction:'dses'}
})
