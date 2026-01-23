import axios from 'axios'
import { useUserStore } from '@/stores/userStore.js'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

// 请求拦截器：自动携带token
api.interceptors.request.use(config => {
  const token = useUserStore().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截器：统一处理错误
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response?.data?.message || error.message)
    return Promise.reject(error)
  }
)

export default api