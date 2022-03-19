// Token
const CSRF_TOKEN_KEY = 'csrfmiddlewaretoken'

const isLogin = () => {
  return !!localStorage.getItem(CSRF_TOKEN_KEY)
}

const getToken = () => {
  return localStorage.getItem(CSRF_TOKEN_KEY)
}

const setToken = (token) => {
  localStorage.setItem(CSRF_TOKEN_KEY, token)
}

const clearToken = () => {
  localStorage.removeItem(CSRF_TOKEN_KEY)
}

// UserId
const USER_ID_KEY = 'user_id'

const hasUserid = () => {
  return !!localStorage.getItem(USER_ID_KEY)
}

const getUserid = () => {
  return localStorage.getItem(USER_ID_KEY)
}

const setUserid = (token) => {
  localStorage.setItem(USER_ID_KEY, token)
}

const clearUserid = () => {
  localStorage.removeItem(USER_ID_KEY)
}

export { isLogin, getToken, setToken, clearToken, clearUserid, getUserid, hasUserid, setUserid }
