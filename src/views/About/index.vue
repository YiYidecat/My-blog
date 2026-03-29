<template>
  <div class="cnblogs-fullscreen">
    <div class="inner-wrapper">
      <Header />

      <div class="main-body">
        <div class="content-inner">
          <div class="content-left">
            <div class="about-container">
              <h2 class="page-title">关于本项目</h2>
              <p class="page-subtitle">以下内容来自仓库根目录的 README.md，修改该文件后保存即可在开发模式下即时更新</p>

              <!-- 使用marked库解析README.md文件 -->
              <article class="readme-body" v-html="readmeHtml"></article>
            </div>
          </div>

          <div class="sidebar-right">
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

            <div class="sidebar-section login-section">
              <h3 class="sidebar-title">访问入口</h3>

              <template v-if="userStore.token === '1'">
                <p class="login-prompt">欢迎回来，{{ user.username }}！</p>
                <div class="login-buttons">
                  <router-link :to="`/dashboard/${userStore.user.id}/editor/new`" class="login-button">写文章</router-link>
                  <router-link :to="`/dashboard/${userStore.user.id}/settings`" class="register-button">设置</router-link>
                </div>
              </template>

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

      <Footer />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import { CategoryAPI } from '@/apis'
import { useUserStore } from '@/stores/userStore.js'
import { ElMessage } from 'element-plus'
import { UserAPI } from '@/apis'
import Header from '@/views/Layout/components/Header.vue'
import Footer from '@/views/Layout/components/Footer.vue'

import readmeSource from '../../../README.md?raw'

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

marked.setOptions({
  gfm: true,
  breaks: true
})

const readmeHtml = computed(() => marked.parse(readmeSource))

const fetchCategories = async () => {
  try {
    const data = await CategoryAPI.getAllCategories()
    const list = data || []
    const sorted = [...list].sort((a, b) => b.count - a.count)
    hotCategories.value = sorted.slice(0, 5)
  } catch (error) {
    console.error('获取分类数据失败:', error)
    ElMessage.error('获取分类数据失败')
  }
}

const fetchUserData = async () => {
  try {
    if (userStore.user) {
      user.value = userStore.user
    } else {
      const userData = await UserAPI.getUserById(1)
      user.value = userData
    }
  } catch (error) {
    console.error('获取用户数据失败:', error)
  }
}

const goToCategoryDetail = (category) => {
  router.push({ path: '/', query: { category: category.name } })
}

onMounted(async () => {
  await fetchCategories()
  await fetchUserData()
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

.about-container {
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
  font-size: 14px;
  color: #888;
  text-align: center;
  margin-bottom: 24px;
}

.readme-body {
  max-width: 900px;
  margin: 0 auto;
  font-size: 15px;
  line-height: 1.75;
  color: #333;
  text-align: left;
}

.readme-body :deep(h1) {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 1.25em 0 0.75em;
  padding-bottom: 0.35em;
  border-bottom: 1px solid #eaecef;
  color: #24292f;
}

.readme-body :deep(h2) {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1.5em 0 0.65em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
  color: #24292f;
}

.readme-body :deep(h3) {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 1.25em 0 0.5em;
  color: #24292f;
}

.readme-body :deep(h4) {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 1em 0 0.5em;
}

.readme-body :deep(p) {
  margin: 0.65em 0;
}

.readme-body :deep(ul),
.readme-body :deep(ol) {
  margin: 0.65em 0;
  padding-left: 1.75em;
}

.readme-body :deep(li) {
  margin: 0.25em 0;
}

.readme-body :deep(blockquote) {
  margin: 0.85em 0;
  padding: 0 1em;
  color: #57606a;
  border-left: 4px solid #d0d7de;
}

.readme-body :deep(pre) {
  margin: 1em 0;
  padding: 14px 16px;
  overflow: auto;
  font-size: 13px;
  line-height: 1.5;
  background-color: #f6f8fa;
  border-radius: 8px;
  border: 1px solid #e1e4e8;
}

.readme-body :deep(code) {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.9em;
}

.readme-body :deep(p code),
.readme-body :deep(li code) {
  padding: 0.15em 0.45em;
  background-color: #f6f8fa;
  border-radius: 4px;
  border: 1px solid #e8eaed;
}

.readme-body :deep(pre code) {
  padding: 0;
  background: none;
  border: none;
}

.readme-body :deep(a) {
  color: #009688;
  text-decoration: none;
}

.readme-body :deep(a:hover) {
  text-decoration: underline;
}

.readme-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  font-size: 14px;
}

.readme-body :deep(th),
.readme-body :deep(td) {
  border: 1px solid #dfe2e5;
  padding: 8px 12px;
}

.readme-body :deep(th) {
  background-color: #f6f8fa;
  font-weight: 600;
}

.readme-body :deep(hr) {
  margin: 1.5em 0;
  border: none;
  border-top: 1px solid #eaecef;
}

.readme-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
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

.login-button,
.register-button {
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
