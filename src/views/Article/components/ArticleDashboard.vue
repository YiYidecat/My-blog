<template>
  <div class="dashboard-article-container">
    <div class="dashboard-article-header">
      <h2>我的文章</h2>
      <div class="article-actions">
        <el-button type="primary" @click="createNewArticle">新建文章</el-button>
      </div>
    </div>
    
    <div class="article-filters">
      <el-input 
        v-model="searchQuery" 
        placeholder="搜索文章..." 
        class="search-input"
        @input="filterArticles"
      />
      <el-select 
        v-model="selectedCategory" 
        placeholder="选择分类" 
        class="category-filter"
        @change="filterArticles"
      >
        <el-option label="全部分类" value=""></el-option>
        <el-option 
          v-for="category in categories" 
          :key="category.id" 
          :label="category.name" 
          :value="category.name"
        ></el-option>
      </el-select>
    </div>
    
    <div class="article-table-container">
      <el-table 
        :data="filteredArticles" 
        stripe 
        style="width: 100%"
        @row-click="handleRowClick"
      >
        <el-table-column prop="title" label="标题" width="300"></el-table-column>
        <el-table-column prop="category" label="分类" width="120"></el-table-column>
        <el-table-column prop="publishDate" label="发布时间" width="150">
          <template #default="{ row }">
            {{ formatDate(row.publishDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览量" width="100"></el-table-column>
        <el-table-column prop="likes" label="点赞数" width="100"></el-table-column>
        <el-table-column prop="commentsCount" label="评论数" width="100"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click.stop="editArticle(row.id)">编辑</el-button>
            <el-button size="small" type="primary" @click.stop="viewArticle(row.id)">查看</el-button>
            <el-button size="small" type="danger" @click.stop="deleteArticle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { PostAPI, CategoryAPI } from '@/apis'
import { useUserStore } from '@/stores/userStore.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const articles = ref([])
const filteredArticles = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')
const categories = ref([])

// 获取所有文章
const fetchArticles = async () => {
  try {
    // 这里需要根据当前用户获取文章，暂时获取所有文章
    // 在实际应用中，后端API应该支持按作者过滤
    const allPosts = await PostAPI.getAllPosts()
    
    // 过滤出当前用户的文章（这里暂时通过作者名匹配）
    const currentUser = userStore.user?.username || userStore.user?.name || '墨语' // 从用户store获取当前用户名
    const userArticles = allPosts.filter(post => post.author === currentUser)
    
    articles.value = userArticles
    filteredArticles.value = userArticles
    
    // 提取所有唯一分类
    const uniqueCategories = [...new Set(userArticles.map(post => post.category))]
    categories.value = uniqueCategories.map((name, index) => ({ id: index + 1, name }))
  } catch (error) {
    console.error('获取文章列表失败:', error)
    ElMessage.error('获取文章列表失败')
  }
}

// 过滤文章
const filterArticles = () => {
  let result = articles.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(article => 
      article.title.toLowerCase().includes(query) || 
      article.content.toLowerCase().includes(query)
    )
  }
  
  if (selectedCategory.value) {
    result = result.filter(article => article.category === selectedCategory.value)
  }
  
  filteredArticles.value = result
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

// 创建新文章
const createNewArticle = () => {
  // 从用户store获取当前用户的ID
  const userId = userStore.user?.id || '1' // 默认使用ID为1的用户
  router.push(`/dashboard/${userId}/editor/new`)
}

// 编辑文章
const editArticle = (articleId) => {
  // 从用户store获取当前用户的ID
  const userId = userStore.user?.id || '1' // 默认使用ID为1的用户
  router.push(`/dashboard/${userId}/articles/editor/${articleId}`)
}

// 查看文章
const viewArticle = (articleId) => {
  router.push(`/post/${articleId}`)
}

// 删除文章
const deleteArticle = async (articleId) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除这篇文章吗？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    // 调用API删除文章
    await PostAPI.deletePost(articleId)
    // 从本地列表中移除
    articles.value = articles.value.filter(article => article.id !== articleId)
    filterArticles()
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除文章失败:', error)
      ElMessage.error('删除文章失败')
    }
  }
}

// 处理表格行点击
const handleRowClick = (row) => {
  viewArticle(row.id)
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.dashboard-article-container {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0;
}

.dashboard-article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dashboard-article-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
}

.article-actions {
  display: flex;
  gap: 10px;
}

.article-filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
}

.search-input {
  width: 300px;
}

.category-filter {
  width: 200px;
}

.article-table-container {
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
</style>