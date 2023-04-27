import Cookie from 'js-cookie'
export function setCookie(name, value, exp){
  Cookie.set(name,value,{expires:exp})
}
export function getAllCookie(){
  return Cookie.get()
}
export function getCookie(name){
  return Cookie.get(name)
}
export function delCookie(name){
  Cookie.remove(name)
}

