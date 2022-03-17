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

export { isLogin, getToken, setToken, clearToken }
