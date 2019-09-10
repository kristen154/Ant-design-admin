import axios from 'axios'

export function get(obj){
  return axios.get(obj.url,obj.params)
}
export function post(obj){
  return axios.post(obj.url,obj.params)
}

export function request(obj){
  if(obj.method.toLowerCase() == 'get')  {
    return get(obj)
  }
  if(obj.method.toLowerCase() == 'post')  {
    return post(obj)
  }

}
