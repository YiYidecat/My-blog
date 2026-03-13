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
            <div class="dashboard-content">
              <h2>欢迎来到您的仪表盘，{{ user.username }}！</h2>
              <p>这里是您的个人空间，您可以管理您的文章、查看统计信息等。</p>
              
              <div class="dashboard-stats">
                <div class="stat-card">
                  <h3>{{ user.articlesCount || 0 }}</h3>
                  <p>文章数量</p>
                </div>
                <div class="stat-card">
                  <h3>{{ user.postsCount || 0 }}</h3>
                  <p>随笔数量</p>
                </div>
                <div class="stat-card">
                  <h3>{{ user.commentsCount || 0 }}</h3>
                  <p>评论数量</p>
                </div>
                <div class="stat-card">
                  <h3>{{ user.viewsCount || 0 }}</h3>
                  <p>总浏览量</p>
                </div>
              </div>
              
              <div class="dashboard-actions">
                <!-- <router-link :to="`/dashboard/${userId}/articles`" class="action-btn primary">管理我的文章</router-link> -->
                <router-link :to="`/dashboard/${userId}/editor/new`" class="action-btn primary">写新文章</router-link>
                <router-link :to="`/dashboard/${userId}/profile`" class="action-btn secondary">编辑个人资料</router-link>
              </div>
            </div>

            <!-- 子路由出口，用于渲染文章列表、编辑器等内容 -->
            <router-view />
          </div>

          <!-- 右侧边栏 -->
          <div class="sidebar-right">
            <!-- 博主信息 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">个人信息</h3>
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

            <!-- 快捷操作 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">快捷操作</h3>
              <ul class="quick-actions">
                <li>
                  <router-link :to="`/dashboard/${userId}/articles`">我的文章</router-link>
                </li>
                <li>
                  <router-link :to="`/dashboard/${userId}/editor/new`">写新文章</router-link>
                </li>
                <li>
                  <router-link :to="`/dashboard/${userId}/profile`">个人资料</router-link>
                </li>
                <li>
                  <router-link to="/settings">设置</router-link>
                </li>
              </ul>
            </div>

            <!-- 最近活动 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">最近活动</h3>
              <ul class="recent-activity">
                <li v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
                  <span class="activity-icon">•</span>
                  <span class="activity-desc">{{ activity.description }}</span>
                  <span class="activity-time">{{ activity.time }}</span>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import { PostAPI, UserAPI } from '@/apis'
import Header from '@/views/Layout/components/Header.vue'
import Footer from '@/views/Layout/components/Footer.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 从路由参数获取用户ID
const userId = route.params.userId

// 响应式数据
const user = ref({
  username: '',
  avatar: '',
  bio: '暂无简介',
  postsCount: 0,
  articlesCount: 0,
  commentsCount: 0,
  viewsCount: 0
})

const recentActivities = ref([
  { description: '发布了新文章', time: '2小时前' },
  { description: '收到了新评论', time: '1天前' },
  { description: '更新了个人资料', time: '3天前' }
])

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    if (userStore.user) {
      // 使用store中的用户信息
      user.value = { ...userStore.user }
    } else {
      // 如果store中没有用户信息，尝试从API获取
      const userData = await UserAPI.getUserById(userId)
      user.value = userData
      userStore.user = userData // 同步到store
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    // 设置默认用户信息
    user.value = {
      username: '用户',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      bio: '暂无简介',
      postsCount: 0,
      articlesCount: 0,
      commentsCount: 0,
      viewsCount: 0
    }
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
.dashboard-content {
  padding: 20px 0;
}

.dashboard-content h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.stat-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.stat-card h3 {
  margin: 0;
  font-size: 2em;
  color: #009688;
}

.stat-card p {
  margin: 5px 0 0 0;
  color: #6c757d;
}

.dashboard-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin: 30px 0;
}

.action-btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.action-btn.primary {
  background-color: #009688;
  color: white;
}

.action-btn.primary:hover {
  background-color: #00796b;
}

.action-btn.secondary {
  background-color: #f8f9fa;
  color: #495057;
  border: 1px solid #e9ecef;
}

.action-btn.secondary:hover {
  background-color: #e9ecef;
}

.quick-actions {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quick-actions li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.quick-actions li:last-child {
  border-bottom: none;
}

.quick-actions a {
  text-decoration: none;
  color: #009688;
  display: block;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.quick-actions a:hover {
  background-color: #f0f0f0;
  color: #00796b;
}

.recent-activity {
  list-style: none;
  padding: 0;
  margin: 0;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  color: #009688;
  margin-right: 8px;
}

.activity-desc {
  flex: 1;
}

.activity-time {
  color: #999;
  font-size: 12px;
}

/* 以下是从原始Layout复制的样式 */
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
</style>