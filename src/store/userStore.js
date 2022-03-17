import { defineStore } from 'pinia'
import { Login, Logout, UserRetrieve } from '@/api/user'
import { getCookie } from '@/utils/cookie'
import { clearToken, setToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: undefined,
    username: undefined,
    nick_name: undefined,
    gender: undefined,
    mobile: undefined,
    email: undefined,
    image: undefined,
    user_type: undefined
  }),
  getters: {
    userInfo (state) {
      return { ...state }
    }
  },
  actions: {
    // Set user's information
    setInfo (partial) {
      this.$patch(partial)
    },

    // Reset user's information
    resetInfo () {
      console.log('reset userInfo !')
      this.$reset()
    },

    // Get user's information
    async getInfo (pk) {
      const res = await UserRetrieve(pk)
      console.log(res)
      this.setInfo(res.data)
    },

    // Login
    async login (loginForm) {
      // eslint-disable-next-line no-useless-catch
      try {
        const res = await Login(loginForm)
        console.log(res)
        console.log('获取csrftoken: ' + getCookie('csrftoken'))
        setToken(getCookie('csrftoken'))
        const pk = res.data.data.id
        await this.getInfo(pk)
      } catch (err) {
        clearToken()
        console.log(err)
      }
    },

    // Logout
    async logout () {
      try {
        await Logout()
      } catch (err) {
        console.log(err)
      } finally {
        clearToken()
        this.resetInfo()
      }
    }
  }
})
