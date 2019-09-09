import { request } from '@/utils/request'
import { USER_URL } from '@/requrl.js'

export function login(data){
  console.log('da',USER_URL.LOGIN.url)
  return request({
    url: USER_URL.LOGIN.url,
    method: USER_URL.LOGIN.method,
    data
  })
}

export function getInfo(token){
  return request({
    url: USER_URL.GETINFO.url,
    method: USER_URL.GETINFO.method,
    params: {token}
  })
}


export function logout(){
  return request({
    url: USER_URL.GETINFO.url,
    methods: 'post'
  })
}
