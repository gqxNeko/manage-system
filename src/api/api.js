import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:2300/'
export function userLogin(param) {
  return axios.post('/userLogin', param)
}

export function userRegister(param) {
  return axios.post('/userRegister', param)
}

export function updateUserInfo(param) {
  return axios.post('/updateUser', param)
}

export function insertItem(param) {
  return axios.post('/insertArticle', param)
}

export function getArticleList(param) {
  const { pageSize = 5, offset = 0, id = null, key = null } = param || {}
  return axios.get('/getArticleList', { params: { pageSize, offset, id, key } })
}

export function addArticle(param) {
  return axios.post('/addArticle', param)
}

export function updateTop(param) {
  return axios.post('/updateTop', param)
}

export function deleteArticle(param) {
  return axios.post('/deleteArticle', param)
}

export function updateArticle(param) {
  return axios.post('/updateArticle', param)
}
