const jwt = require('jsonwebtoken')
let flag = false
export function loginStatus(token, secret) {
  try {
    const decodeItem = jwt.decode(token, secret)
    const len = secret.length
    if (decodeItem && Number(secret.slice(0, len - 3)) == decodeItem.iat) {
      flag = true
    }
  } catch (e) {}

  return flag
}
