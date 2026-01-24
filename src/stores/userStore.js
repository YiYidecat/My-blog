import { tr } from 'element-plus/es/locales.mjs'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: null
  }),
  actions: {
    login(userData) {
      // 直接存储用户数据，因为我们已经在组件中验证了用户凭据
      this.user = userData

      this.token = '1' // 在实际应用中，这里应该存储从服务器获取的token，在这里仅作为区分是否登录的标志

      return true
    },
    logout() {
      this.token = ''
      this.user = null
    }
  }
})