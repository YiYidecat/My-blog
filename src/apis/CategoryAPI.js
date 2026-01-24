import api from '@/utils/request.js'

/**
 * 分类相关API接口
 */
export const CategoryAPI = {
  /**
   * 获取所有分类
   */
  getAllCategories: () => api.get('/categories'),

  /**
   * 根据ID获取分类
   */
  getCategoryById: (id) => api.get(`/categories/${id}`),

  /**
   * 创建分类
   */
  createCategory: (categoryData) => api.post('/categories', categoryData),

  /**
   * 更新分类
   */
  updateCategory: (id, categoryData) => api.put(`/categories/${id}`, categoryData),

  /**
   * 删除分类
   */
  deleteCategory: (id) => api.delete(`/categories/${id}`),
}