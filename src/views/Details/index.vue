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
            <!-- 文章详情 -->
            <div v-if="item" class="single-item">
              <div class="item-content">
                <h1 class="item-title">{{ item.title }}</h1>
                <div class="item-meta">
                  <span class="author">作者: {{ item.author }}</span>
                  <span class="date">日期: {{ item.publishDate }}</span>
                  <span class="category">分类: {{ item.category }}</span>
                </div>
                <div class="item-content-body">{{ item.content }}</div>
                <div class="item-stats">
                  <span class="likes">点赞: {{ item.likes }}</span>
                  <span class="views">浏览: {{ item.views }}</span>
                  <span class="comments">评论: {{ item.commentsCount }}</span>
                </div>
                <div class="item-tags">
                  <el-tag 
                      v-for="tag in item.tags" 
                      :key="tag" 
                      size="small" 
                      style="margin-right: 5px;"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </div>
            <div v-else class="loading">
              <p>正在加载文章详情...</p>
            </div>
            <div class="back-button" v-if="item">
              <el-button @click="BackToPostList" type="primary" plain>返回文章列表</el-button>
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
                    :src="user.avatar || '/default-avatar.png'"
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

            <!-- 相关文章 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">相关文章</h3>
              <ul class="related-posts">
                <li v-for="post in relatedPosts" :key="post.id" class="related-post-item">
                  <router-link :to="`/details/${post.id}/${post.author}`" class="related-post-link">{{ post.title }}</router-link>
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
                  <router-link to="/editor" class="login-button">写文章</router-link>
                  <router-link to="/settings" class="register-button">设置</router-link>
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
import { useRoute, useRouter } from 'vue-router'
import { PostAPI } from '@/apis/PostAPI.js'
import { useUserStore } from '@/stores/userStore.js'
import { ElMessage } from 'element-plus'
import { useHistoryStore } from '@/stores/historyStore.js'
import { UserAPI } from '@/apis'
import Header from '@/views/Layout/components/Header.vue'
import Footer from '@/views/Layout/components/Footer.vue'

const item = ref(null)
const relatedPosts = ref([])
const user = ref({
  username: '',
  avatar: '',
  bio: '',
  postsCount: 0,
  articlesCount: 0,
  commentsCount: 0
})

// 获取路由参数中的id(useRoute)
const route = useRoute()
const itemId = route.params.id
// 获取路由参数中的作者信息
const author = route.params.author

// 用于路由重定向(useRouter)
const router = useRouter()

// 获取用户状态管理实例
const userStore = useUserStore()

// 获取浏览历史状态管理实例
const historyStore = useHistoryStore()

// 根据路由参数中的id以及用户id来获取对应的文章详情（因为不同用户之间的文章id可能会重复）
const getDetails = async () => {
    try {
        // 检查用户是否登录
        if (!userStore.token) {
            // 如果用户未登录，重定向到登录页面
            router.push('/login')
            ElMessage.error('请先登录才能查看文章详情')
            return
        }
        
        // 如果author参数存在，则使用getPostByIdAndAuthor，否则使用getPostById
        if (author) {
            item.value = await PostAPI.getPostByIdAndAuthor(itemId, author)
        } else {
            item.value = await PostAPI.getPostById(itemId)
        }
        
        // 调用浏览历史状态管理实例的addHistory方法添加到浏览历史中
        historyStore.addHistory(item.value)
        
        // 获取相关文章（同一分类的文章，排除当前文章）
        if (item.value) {
          const allPosts = await PostAPI.getAllPosts()
          relatedPosts.value = allPosts
            .filter(post => post.category === item.value.category && post.id !== item.value.id)
            .slice(0, 5) // 只取前5个相关文章
        }
        
        console.log("当前获取的文章详情:", item.value)
    } catch (error) {
        console.error('Error fetching post details:', error)
    }
}

// 点击返回文章列表按钮时，重定向到文章列表页面，注意跳转到的页面一定是刚刚浏览的分页后的文章列表页面
const BackToPostList = () => {
    // 从路由参数中获取当前分页信息
    const currentPage = route.query.page || 1
    // 构建返回的路由路径，包含分页参数
    const returnPath = { path: '/', query: { page: currentPage } }
    // 重定向到构建好的路径
    router.push(returnPath)
    
    // 页面跳转后滚动到顶部
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100); // 延迟执行以确保页面已加载
}

// 从 API 获取用户数据
const fetchUserData = async () => {
  try {
    if (userStore.user) {
      user.value = userStore.user
    } else {
      const userData = await UserAPI.getUserById(0) // 获取ID为0的默认用户
      user.value = userData
    }
  } catch (error) {
    console.error('获取用户数据失败:', error)
  }
}

// 组件挂载时调用获取文章详情
onMounted(() => {
    getDetails()
    fetchUserData()
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

.single-item{
  width: 100%;
}

.item-content{
  display: flex;
  flex-direction: column;
}

.item-title{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.item-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.item-content-body {
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  margin: 20px 0;
  white-space: pre-wrap;
}

.item-stats {
  display: flex;
  gap: 20px;
  margin: 15px 0;
  font-size: 14px;
  color: #666;
}

.item-tags {
  margin-top: 15px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;
}

.back-button {
  text-align: center;
  margin: 20px 0;
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

.related-posts {
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-post-item {
  border-bottom: 1px solid #f5f5f5;
  padding: 10px 0;
}

.related-post-item:last-child {
  border-bottom: none;
}

.related-post-link {
  display: block;
  text-decoration: none;
  color: #555;
  font-size: 14px;
  line-height: 1.4;
  transition: color 0.3s;
}

.related-post-link:hover {
  color: #009688;
  text-decoration: underline;
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
</style>