import api from '@/utils/request.js'

/**
 * 评论相关API接口
 */
export const CommentAPI = {
  /**
   * 获取所有评论
   */
  getAllComments: () => api.get('/comments'),

  /**
   * 根据ID获取评论
   */
  getCommentById: (id) => api.get(`/comments/${id}`),

  /**
   * 根据文章ID获取评论
   */
  getCommentsByPostId: (postId) => api.get(`/comments?postId=${postId}`),

  /**
   * 创建评论
   */
  createComment: (commentData) => api.post('/comments', commentData),

  /**
   * 更新评论
   */
  updateComment: (id, commentData) => api.put(`/comments/${id}`, commentData),

  /**
   * 删除评论
   */
  deleteComment: (id) => api.delete(`/comments/${id}`),
}