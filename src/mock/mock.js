const Mock = require('mockjs')
import {URLPATH} from '@/requrl.js'
Mock.mock(URLPATH.LOGIN.url,(req, res) => {
  console.log('进来了')
  return {
    data:{
      token:'ddt'
    }
  }
})
