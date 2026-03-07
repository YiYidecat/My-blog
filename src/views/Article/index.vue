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
            <div class="article-main-container">
              <router-view />
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
                    :src="user.avatar"
                    alt="博主头像"
                    class="avatar-img"
                  />
                </div>
                <div class="author-details">
                  <h4 class="author-name">{{ user.username }}</h4>
                  <p class="author-bio">{{ user.bio }}</p>
                  <div class="author-stats">
                    <div class="stat">
                      <span class="stat-number">{{ user.postsCount }}</span>
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

            <!-- 文章分类 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">热门文章分类</h3>
              <ul class="category-list">
                <li v-for="category in categories.slice(0, 3)" :key="category.id" class="category-item">
                  <router-link :to="`/category/${category.id}`" class="category-link">
                    <span class="category-name">{{ category.name }}</span>
                    <span class="category-count">({{ category.count }})</span>
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- 最新评论 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">最新热门评论</h3>
              <ul class="comment-list">
                <li v-for="comment in recentComments.slice(0, 3)" :key="comment.id" class="comment-item">
                  <div class="comment-content">
                    <span class="comment-author">{{ comment.author }}</span> 发表在
                    <router-link :to="`/post/${comment.postId}`" class="comment-post">{{ getPostTitleById(comment.postId) }}</router-link>
                  </div>
                  <div class="comment-text">{{ comment.content }}</div>
                </li>
              </ul>
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
// 文章列表主入口,其中包括文章列表模块、文章详情编辑模块还有文章发布模块
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import { PostAPI, CategoryAPI, CommentAPI, UserAPI } from '@/apis'
import Header from '@/views/Layout/components/Header.vue'
import Footer from '@/views/Layout/components/Footer.vue'

const userStore = useUserStore()

// 响应式数据
const user = ref({
  username: '',
  avatar: '',
  bio: '暂无简介',
  postsCount: 0,
  articlesCount: 0,
  commentsCount: 0
})

const categories = ref([])
const recentComments = ref([])

// 获取文章标题的方法
const getPostTitleById = (postId) => {
  // 这个方法将在获取到文章列表后使用
  return '文章标题'
}

// 从 API 获取数据
const fetchData = async () => {
  try {
    // 使用 store 中的用户信息，如果不存在则获取默认用户
    if (userStore.user) {
      user.value = { ...userStore.user }
    } else {
      const userData = await UserAPI.getUserById(0) // 获取ID为0的默认用户
      user.value = userData
    }
    
    // 获取分类列表
    categories.value = await CategoryAPI.getAllCategories()
    
    // 获取最新评论
    recentComments.value = await CommentAPI.getAllComments()
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

onMounted(() => {
  fetchData()
  
  // 监听用户store的变化，确保用户信息是最新的
  const updateUserFromStore = () => {
    if (userStore.user) {
      user.value = { ...userStore.user }
    }
  }
  
  // 手动调用一次以确保当前用户信息正确
  updateUserFromStore()
})
</script>

<style scoped>
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

.main-body > .content-inner {
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

.article-main-container {
  width: 100%;
  min-height: calc(100vh - 120px); /* 减去头部和底部的高度 */
  padding: 20px 0;
  box-sizing: border-box;
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
  margin-bottom: 15px;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.author-details {
  width: 100%;
}

.author-name {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.author-bio {
  color: #7f8c8d;
  font-size: 14px;
  margin: 0 0 15px 0;
}

.author-stats {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #009688;
}

.stat-label {
  font-size: 12px;
  color: #7f8c8d;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.category-item:last-child {
  border-bottom: none;
}

.category-link {
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: #009688;
}

.category-link:hover {
  color: #00796b;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-content {
  font-size: 14px;
  margin-bottom: 5px;
}

.comment-author {
  font-weight: bold;
  color: #2c3e50;
}

.comment-post {
  color: #009688;
  text-decoration: none;
}

.comment-post:hover {
  text-decoration: underline;
}

.comment-text {
  color: #7f8c8d;
  font-size: 13px;
  line-height: 1.4;
}
</style>