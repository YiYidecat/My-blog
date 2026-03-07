<template>
  <header class="top-header">
    <div class="header-content">
      <h1 class="site-title">
        <a href="/" class="title-link">墨语博客</a>
      </h1>
      <nav class="main-navigation">
        <router-link to="/" class="nav-link" active-class="active">首页</router-link>
        <router-link to="/blog" class="nav-link" active-class="active">博文</router-link>
        <router-link to="/category" class="nav-link" active-class="active">分类</router-link>
        <router-link to="/archive" class="nav-link" active-class="active">归档</router-link>
        <router-link to="/about" class="nav-link" active-class="active">关于</router-link>
        
        <!-- 登录状态下的导航项 -->
        <template v-if="userStore.token === '1'">
          <!-- <router-link :to="`/dashboard/${userStore.user.id}`" class="nav-link" active-class="active">仪表盘</router-link> -->
          <router-link :to="`/dashboard/${userStore.user.id}`" class="nav-link" active-class="active">我的文章</router-link>
          <router-link to="/dashboard/:userId/favorites" class="nav-link" active-class="active">收藏</router-link>
          <router-link to="/profile" class="nav-link" active-class="active">个人资料</router-link>
          
          <!-- 用户下拉菜单 -->
          <div class="user-menu">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img :src="user.avatar" alt="头像" class="avatar">
                {{ user.username }}
                <el-icon><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goToProfile">个人资料</el-dropdown-item>
                  <el-dropdown-item @click="goToSettings">设置</el-dropdown-item>
                  <el-dropdown-item @click="handleLogout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
        
        <!-- 非登录状态下的导航项 -->
        <template v-else>
          <router-link to="/login" class="nav-link login-btn">登录</router-link>
          <router-link to="/resume" class="cta-button">View My Resume</router-link>  <!-- 添加简历链接 -->
        </template>
      </nav>
      <div class="search-container">
        <input type="text" class="search-input" placeholder="搜索博客..." />
        <button class="search-button">搜索</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import { ElMessage, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { UserAPI } from '@/apis'

const router = useRouter()
const userStore = useUserStore()

// 初始化用户信息
const user = ref({
  username: '墨语',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  bio: '专注于技术分享与交流',
  postsCount: 0,
  articlesCount: 0,
  commentsCount: 0
})

// 跳转到个人资料页
const goToProfile = () => {
  router.push('/profile')
}

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

onMounted(() => {
  // 监听用户store的变化，确保用户信息是最新的
  const updateUserFromStore = () => {
    if (userStore.user) {
      user.value = userStore.user
    }
  }
  
  // 手动调用一次以确保当前用户信息正确
  updateUserFromStore()
})
</script>

<style scoped>
.top-header {
  width: 100%;
  background-color: #2c3e50;
  border-bottom: 3px solid #009688;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 60px;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 60px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
}

.site-title {
  margin: 0;
}
.title-link {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
}
.title-link:hover {
  color: #009688;
}

.main-navigation {
  display: flex;
  align-items: center;
  gap: 5px;
}
.nav-link {
  color: #bdc3c7;
  text-decoration: none;
  padding: 8px 12px;
  font-size: 15px;
  border-radius: 3px;
  transition: all 0.3s;
}
.nav-link:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}
.nav-link.active {
  color: #009688;
  font-weight: bold;
  background-color: rgba(0, 150, 136, 0.1);
}

/*简历部分样式*/
.cta-button {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 5px;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: scale(1.05);
}

.search-container {
  display: flex;
  align-items: center;
}
.search-input {
  padding: 6px 10px;
  border: 1px solid #34495e;
  border-right: none;
  border-radius: 3px 0 0 3px;
  background-color: #34495e;
  color: #fff;
  width: 200px;
  outline: none;
}
.search-input:focus {
  border-color: #009688;
}
.search-button {
  padding: 6px 15px;
  background-color: #009688;
  color: white;
  border: none;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}
.search-button:hover {
  background-color: #00796b;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;
  color: #bdc3c7;
}
.el-dropdown-link:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>