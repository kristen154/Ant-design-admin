const Mock = require('mockjs')
import {URLPATH} from '@/requrl.js'
Mock.mock(URLPATH.LOGIN,(req, res) => {
  console.log('进来了')
  return {
    data:'dd'
  }
})
