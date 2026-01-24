import api from '@/utils/request.js'

/**
 * 用户相关API接口
 */
export const UserAPI = {
  /**
   * 获取所有用户
   */
  getAllUsers: () => api.get('/users'),

  /**
   * 根据ID获取用户
   */
  getUserById: (id) => api.get(`/users/${id}`),

  /**
   * 根据用户名获取用户
   */
  getUserByUsername: (username) => api.get(`/users?username=${username}`),

  /**
   * 创建用户
   */
  createUser: (userData) => api.post('/users', userData),

  /**
   * 更新用户
   */
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),

  /**
   * 删除用户
   */
  deleteUser: (id) => api.delete(`/users/${id}`),


}