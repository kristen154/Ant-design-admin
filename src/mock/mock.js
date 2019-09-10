const Mock = require('mockjs')
import {URLPATH, USER_URL} from '@/requrl.js'
Mock.mock(USER_URL.LOGIN.url,(req, res) => {
  console.log('进来了',USER_URL.GETINFO.url,USER_URL.LOGIN.url)
  return {
    data:{
      token:'ddt'
    }
  }
})


Mock.mock(USER_URL.GETINFO.url,(req,res)=>{
  console.log('getinfo',USER_URL.GETINFO.url)
  return {roles:['admin'], name:'kitt', avatar:'ava', introduction:'dses'}
})
