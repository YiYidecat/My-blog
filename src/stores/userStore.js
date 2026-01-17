import { defineStore } from 'pinia'
import api from '@/utils/request.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: null
  }),
  actions: {
    async login(username, password) {
      const { token } = await api.post('/login', { username, password })
      this.token = token
      this.user = { username }
      return true
    },
    logout() {
      this.token = ''
      this.user = null
    }
  }
})