import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:2200/'
export function userLogin(param) {
  return axios.post('/userLogin', param)
}

export function userRegister(param) {
  return axios.post('/userRegister', param)
}

export function updateUserInfo(param) {
  return axios.post('/updateUser', param)
}