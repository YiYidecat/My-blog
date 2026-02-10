import axios from 'axios'
import { useUserStore } from '@/stores/userStore.js'

// 检测是否在GitHub Pages环境中
const isGitHubPages = window.location.hostname.includes('github.io');

// 根据环境设置API基础URL
// 在本地开发时使用 http://localhost:3000，GitHub Pages时使用 ./api
const baseURL = isGitHubPages ? './api' : 'http://localhost:3000';

const api = axios.create({
  baseURL: baseURL,
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