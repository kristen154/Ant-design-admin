export const URLPATH = {
  LOGIN: 'api/login'
}

function adaptUrl(url,method){
  return {url: url,method: method}
}

export const USER_URL = {
  LOGIN: adaptUrl('api/login','post'),
  GETINFO: adaptUrl('api/getinfo','get'),
  LOTOUT: adaptUrl('api/logout','post'),
}
