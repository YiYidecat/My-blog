<template>
  <div class="cnblogs-fullscreen">
    <div class="inner-wrapper">
      <!-- 顶部导航栏 -->
      <Header />

      <!-- 主体内容 -->
      <div class="main-body">
        <div class="content-inner">
          <!-- 左侧内容区域 -->
          <div class="content-left">
            <div class="categories-container">
              <h2 class="page-title">文章分类</h2>
              <p class="page-subtitle">浏览不同分类下的文章，快速找到感兴趣的内容</p>
              
              <!-- 分类卡片网格 -->
              <div class="categories-grid">
                <div 
                  v-for="category in categories" 
                  :key="category.id" 
                  class="category-card"
                  @click="goToCategoryDetail(category)"
                >
                  <div class="category-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.89L8 2H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                    </svg>
                  </div>
                  <div class="category-info">
                    <h3 class="category-name">{{ category.name }}</h3>
                    <p class="category-count">{{ category.count }} 篇文章</p>
                  </div>
                  <div class="category-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- 空状态提示 -->
              <div v-if="categories.length === 0" class="empty-state">
                <div class="empty-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.89L8 2H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                  </svg>
                </div>
                <h3 class="empty-title">暂无分类</h3>
                <p class="empty-description">当前还没有任何文章分类</p>
              </div>
            </div>
          </div>

          <!-- 右侧边栏 -->
          <div class="sidebar-right">
            <!-- 博主信息 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">博主信息</h3>
              <div class="author-info">
                <div class="author-avatar">
                  <img
                    :src="user.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                    alt="博主头像"
                    class="avatar-img"
                  />
                </div>
                <div class="author-details">
                  <h4 class="author-name">{{ user.username || '访客' }}</h4>
                  <p class="author-bio">{{ user.bio || '暂无简介' }}</p>
                  <div class="author-stats">
                    <div class="stat">
                      <span class="stat-number">{{ user.postsCount || 0 }}</span>
                      <span class="stat-label">随笔</span>
                    </div>
                    <div class="stat">
                      <span class="stat-number">{{ user.articlesCount || 0 }}</span>
                      <span class="stat-label">文章</span>
                    </div>
                    <div class="stat">
                      <span class="stat-number">{{ user.commentsCount || 0 }}</span>
                      <span class="stat-label">评论</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 最近文章 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">热门分类</h3>
              <ul class="recent-posts">
                <li 
                  v-for="category in hotCategories" 
                  :key="category.id" 
                  class="recent-post-item"
                  @click="goToCategoryDetail(category)"
                >
                  <div class="recent-post-link">
                    <span class="post-title">{{ category.name }}</span>
                    <span class="post-count">({{ category.count }})</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- 登录入口或功能入口 -->
            <div class="sidebar-section login-section">
              <h3 class="sidebar-title">访问入口</h3>
              
              <!-- 登录状态下显示功能入口 -->
              <template v-if="userStore.token === '1'">
                <p class="login-prompt">欢迎回来，{{ user.username }}！</p>
                <div class="login-buttons">
                  <router-link :to="`/dashboard/${userStore.user.id}/editor/new`" class="login-button">写文章</router-link>
                  <router-link :to="`/dashboard/${userStore.user.id}/settings`" class="register-button">设置</router-link>
                </div>
              </template>
              
              <!-- 非登录状态下显示登录入口 -->
              <template v-else>
                <p class="login-prompt">立即登录，发布你的第一篇博客</p>
                <div class="login-buttons">
                  <router-link to="/login" class="login-button">登录</router-link>
                  <router-link to="/register" class="register-button">注册</router-link>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- 页脚 -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CategoryAPI } from '@/apis'
import { PostAPI } from '@/apis'
import { useUserStore } from '@/stores/userStore.js'
import { ElMessage } from 'element-plus'
import { UserAPI } from '@/apis'
import Header from '@/views/Layout/components/Header.vue'
import Footer from '@/views/Layout/components/Footer.vue'

const categories = ref([])
const hotCategories = ref([])
const user = ref({
  username: '',
  avatar: '',
  bio: '',
  postsCount: 0,
  articlesCount: 0,
  commentsCount: 0
})

const router = useRouter()
const userStore = useUserStore()

// 获取分类数据
const fetchCategories = async () => {
  try {
    // 获取所有分类和文章数据
    const [categoriesData, postsData] = await Promise.all([
      CategoryAPI.getAllCategories(),
      PostAPI.getAllPosts()
    ])
    
    // 计算每个分类的文章数量
    const posts = Array.isArray(postsData) ? postsData : (postsData || [])
    const categoriesWithCount = (Array.isArray(categoriesData) ? categoriesData : (categoriesData || [])).map(category => {
      const count = posts.filter(post => post.category === category.name).length
      return {
        ...category,
        count: count
      }
    })
    
    categories.value = categoriesWithCount
    
    // 按文章数量排序，获取热门分类
    const sortedCategories = [...categories.value].sort((a, b) => b.count - a.count)
    hotCategories.value = sortedCategories.slice(0, 5)
  } catch (error) {
    console.error('获取分类数据失败:', error)
    ElMessage.error('获取分类数据失败')
  }
}

// 获取用户数据
const fetchUserData = async () => {
  try {
    if (userStore.user) {
      user.value = userStore.user
    } else {
      const userData = await UserAPI.getUserById(1) // 获取ID为1的默认用户——游客用户
      user.value = userData
    }
  } catch (error) {
    console.error('获取用户数据失败:', error)
  }
}

// 跳转到分类详情页面（目前暂时跳转到主页并带分类参数）
const goToCategoryDetail = (category) => {
  // 这里可以根据需要实现分类详情页或跳转到带分类筛选的文章列表
  router.push({ path: '/', query: { category: category.name } })
}

// 组件挂载时获取数据
onMounted(async () => {
  await fetchCategories()
  await fetchUserData()
})
</script>

<style scoped>
/* 继承 Layout 组件的样式 */
.cnblogs-fullscreen {
  position: fixed;
  inset: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Microsoft YaHei", "Segoe UI", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.inner-wrapper {
  width: 100%;
  max-width: 1400px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  background-color: transparent;
  box-sizing: border-box;
}

.main-body {
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  flex: 1;
  box-sizing: border-box;
  gap: 0;
  align-items: flex-start;
}

.content-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 0;
  padding: 20px;
  box-sizing: border-box;
}

.content-left {
  flex: 1;
  background-color: white;
  padding: 20px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}

.categories-container {
  width: 100%;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

.page-subtitle {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.category-card {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-color: #009688;
}

.category-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0f2f1;
  border-radius: 8px;
  margin-right: 15px;
  color: #009688;
}

.category-info {
  flex: 1;
}

.category-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #333;
}

.category-count {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.category-arrow {
  color: #ccc;
  transition: color 0.3s;
}

.category-card:hover .category-arrow {
  color: #009688;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-icon {
  margin-bottom: 20px;
  color: #ccc;
}

.empty-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.empty-description {
  font-size: 16px;
  margin: 0;
}

.sidebar-right {
  width: 280px;
  background-color: white;
  padding: 20px;
  margin: 0;
  border-left: 1px solid #eee;
  box-sizing: border-box;
}

.sidebar-section {
  margin-bottom: 25px;
}

.sidebar-title {
  color: #2c3e50;
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #009688;
}

.author-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  background-color: #f5f5f5;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  color: #2c3e50;
  font-size: 18px;
  margin-bottom: 5px;
}

.author-bio {
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 15px;
}

.author-stats {
  display: flex;
  justify-content: space-around;
  width: 100%;
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  color: #009688;
  font-size: 20px;
  font-weight: bold;
}

.stat-label {
  color: #7f8c8d;
  font-size: 12px;
  margin-top: 5px;
}

.recent-posts {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-post-item {
  border-bottom: 1px solid #f5f5f5;
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.recent-post-item:hover {
  background-color: #f5f5f5;
}

.recent-post-link {
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: #555;
  font-size: 14px;
  line-height: 1.4;
  transition: color 0.3s;
}

.recent-post-link:hover {
  color: #009688;
}

.post-title {
  flex: 1;
}

.post-count {
  color: #999;
}

.login-section {
  text-align: center;
}

.login-prompt {
  color: #7f8c8d;
  margin-bottom: 20px;
  font-size: 14px;
}

.login-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-direction: column;
}

.login-button, .register-button {
  padding: 10px 25px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
  font-size: 14px;
  display: inline-block;
  border: none;
  cursor: pointer;
  text-align: center;
}

.login-button {
  background-color: #009688;
  color: white;
  border: 2px solid #009688;
}

.login-button:hover {
  background-color: #00796b;
  border-color: #00796b;
}

.register-button {
  background-color: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
}

.register-button:hover {
  background-color: #e74c3c;
  color: white;
}

/* 添加平滑过渡动画 */
.category-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.categories-grid {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>