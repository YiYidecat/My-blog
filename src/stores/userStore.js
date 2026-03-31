import { defineStore } from 'pinia'
import api from '@/utils/request.js'

function decodeJwtPayload(token) {
  try {
    const payload = token?.split?.('.')[1]
    if (!payload) return null

    // base64url -> base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    // pad for atob
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const raw = atob(padded)

    // UTF-8 decode (more robust than decodeURIComponent/escape)
    const bytes = Uint8Array.from(raw, (c) => c.charCodeAt(0))
    const jsonStr = new TextDecoder('utf-8').decode(bytes)
    return JSON.parse(jsonStr)
  } catch (e) {
    return null
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user
  },
  actions: {
    async login(credentials) {
      try {
        // 检测是否在GitHub Pages环境中
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        if (isGitHubPages) {
          // GitHub Pages环境：从静态JSON文件中验证用户
          const users = await api.get('/users.json');
          
          const user = users.find(u => 
            u.username === credentials.username && 
            u.password === credentials.password
          );
          
          if (user) {
            // 模拟认证成功 - 使用临时token
            this.token = `mock_token_${Date.now()}`;
            this.user = user;
            
            // 将token和用户信息存储在localStorage中以便持久化
            localStorage.setItem('userToken', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));
            
            return { success: true, user: this.user, token: this.token };
          } else {
            return { success: false, message: '用户名或密码错误' };
          }
        } else {
          // 本地开发环境：使用后端API进行认证
          const authResponse = await api.post('/users/authenticate', credentials);

          // 后端可能只返回 token（例如 user 字段被过滤/校验失败时）
          if (authResponse && authResponse.access_token) {
            this.token = authResponse.access_token

            // 先用响应里的 user；如果没有则用 JWT 里的 user_id 再补拉
            let user = authResponse.user || null
            if (!user) {
              const decoded = decodeJwtPayload(this.token)
              const userId = decoded?.user_id
              if (userId) {
                user = await api.get(`/users/${userId}`)
              }
            }

            if (user) {
              this.user = user
              localStorage.setItem('userToken', this.token)
              localStorage.setItem('user', JSON.stringify(this.user))
              return { success: true, user: this.user, token: this.token }
            }
          }

          console.error('认证响应格式不正确:', authResponse)
          return { success: false, message: '认证失败 - 响应格式错误' }
        }
      } catch (error) {
        console.error('登录错误:', error);
        return { success: false, message: error.message || '登录失败' };
      }
    },
    
    logout() {
      this.token = ''
      this.user = null
      
      // 清除本地存储
      localStorage.removeItem('userToken')
      localStorage.removeItem('user')
    },
    
    // 初始化用户状态（例如页面刷新后恢复登录状态）
    initializeFromStorage() {
      const storedToken = localStorage.getItem('userToken')
      const storedUser = localStorage.getItem('user')
      
      if (storedToken && storedUser) {
        this.token = storedToken
        this.user = JSON.parse(storedUser)
      }
    },
    
    // 验证当前token是否仍然有效
    async validateToken() {
      if (!this.token || !this.user) {
        return false
      }
      
      try {
        // 尝试获取当前用户信息来验证token
        const response = await api.get(`/users/${this.user.id}`)
        if (response && response.id) {
          // 更新用户信息
          this.user = response
          return true
        }
        return false
      } catch (error) {
        console.error('Token验证失败:', error)
        this.logout() // 如果token无效，执行登出操作
        return false
      }
    }
  }
})