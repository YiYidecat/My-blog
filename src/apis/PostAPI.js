import api from '@/utils/request.js'

/**
 * 文章相关API接口
 */
export const PostAPI = {
  /**
   * 获取所有文章
   */
  getAllPosts: () => api.get('/posts'),

  /**
   * 根据ID获取文章
   */
  getPostById: (id) => api.get(`/posts/${id}`),

  /**
   * 创建文章
   */
  createPost: (postData) => api.post('/posts', postData),

  /**
   * 更新文章
   */
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),

  /**
   * 删除文章
   */
  deletePost: (id) => api.delete(`/posts/${id}`),

  /**
   * 点赞文章
   */
  likePost: (id) => api.patch(`/posts/${id}`, { likes: 1 }), // 实际使用中可能需要后端支持专门的点赞接口
}