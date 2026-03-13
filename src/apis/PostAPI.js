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
  getPostById: async (id) => {
    // 先获取所有文章，然后筛选出指定ID的文章
    const allPosts = await api.get('/posts');
    const post = allPosts.find(p => p.id === String(id));
    
    if (!post) {
      throw new Error(`未找到ID为 ${id} 的文章`);
    }
    
    return post;
  },

    /**
   * 根据文章ID和作者信息获取文章
   */
  getPostByIdAndAuthor: async (id, author) => {
    // 先获取所有文章，然后筛选出指定ID和作者的文章
    const allPosts = await api.get('/posts');
    const post = allPosts.find(p => p.id === String(id) && p.author === author);
    
    if (!post) {
      throw new Error(`未找到ID为 ${id} 且作者为 ${author} 的文章`);
    }
    
    return post;
  },

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