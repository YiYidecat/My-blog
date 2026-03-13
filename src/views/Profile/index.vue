<template>
  <div class="cnblogs-fullscreen">
    <div class="inner-wrapper">
      <!-- 顶部导航栏 -->
      <Header />

      <!-- 主体内容 -->
      <div class="main-body">
        <div class="content-inner">
          <!-- 左侧内容 -->
          <div class="content-left">
            <div class="profile-container">
              <h1 class="profile-title">个人中心</h1>
              <div class="profile-nav">
                 <router-link to="/profile" class="nav-item" active-class="active">浏览历史</router-link>
               </div>
              <div class="profile-content">
                <router-view />
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

            <!-- 快捷入口 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">快捷入口</h3>
              <div class="quick-links">
                <router-link to="/" class="quick-link">首页</router-link>
                <router-link to="/editor" class="quick-link">写文章</router-link>
                <router-link to="/profile" class="quick-link">个人资料</router-link>
              </div>
            </div>

            <!-- 登录入口或功能入口 -->
            <div class="sidebar-section login-section">
              <h3 class="sidebar-title">账户操作</h3>
              
              <!-- 登录状态下显示功能入口 -->
              <template v-if="userStore.token === '1'">
                <p class="login-prompt">欢迎回来，{{ user.username }}！</p>
                <div class="login-buttons">
                  <button @click="goToSettings" class="login-button">设置</button>
                  <button @click="handleLogout" class="register-button">退出登录</button>
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
import { useUserStore } from '@/stores/userStore.js'
import { ElMessage } from 'element-plus'
import { UserAPI } from '@/apis'
import Header from '@/views/Layout/components/Header.vue'
import Footer from '@/views/Layout/components/Footer.vue'

const router = useRouter()
const userStore = useUserStore()

// 用户信息
const user = ref({
  username: '',
  avatar: '',
  bio: '',
  postsCount: 0,
  articlesCount: 0,
  commentsCount: 0
})

// 跳转到设置页
const goToSettings = () => {
  router.push('/settings')
}

// 处理退出登录
const handleLogout = () => {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/login')
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

onMounted(() => {
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

.profile-container {
  width: 100%;
}

.profile-title {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #009688;
}

.profile-nav {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.nav-item {
  padding: 8px 16px;
  text-decoration: none;
  color: #555;
  border-radius: 4px;
  transition: all 0.3s;
  border: 1px solid #ddd;
}

.nav-item:hover {
  background-color: #f5f5f5;
  color: #009688;
}

.nav-item.active {
  background-color: #009688;
  color: white;
  border-color: #009688;
}

.profile-content {
  padding-top: 20px;
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

.quick-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-link {
  padding: 10px;
  text-decoration: none;
  color: #555;
  border: 1px solid #eee;
  border-radius: 4px;
  transition: all 0.3s;
}

.quick-link:hover {
  background-color: #f5f5f5;
  color: #009688;
  border-color: #009688;
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