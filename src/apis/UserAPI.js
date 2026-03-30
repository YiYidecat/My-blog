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

  /**
   * 用户认证
   */
  authenticateUser: async (credentials) => {
    // 检测是否在GitHub Pages环境中
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      // GitHub Pages环境：从静态JSON文件中验证用户
      const response = await api.get('/users'); // 这会获取users.json
      
      const user = response.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password
      );
      
      if (user) {
        // 返回一个模拟认证成功的响应
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          avatar: user.avatar,
          postsCount: user.postsCount,
          followersCount: user.followersCount,
          followingCount: user.followingCount,
          createdAt: user.createdAt
        };
      } else {
        throw new Error('用户名或密码错误');
      }
    } else {
      // 本地开发环境：使用后端API进行认证
      return api.post('/users/authenticate', credentials);
    }
  }


}