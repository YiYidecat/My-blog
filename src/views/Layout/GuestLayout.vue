<template>
  <div class="cnblogs-fullscreen">
    <div class="inner-wrapper">
      <!-- 顶部导航栏 -->
      <header class="top-header">
        <div class="header-content">
          <h1 class="site-title">
            <a href="/" class="title-link">墨语博客</a>
          </h1>
          <nav class="main-navigation">
            <a href="/" class="nav-link active">首页</a>
            <a href="/blog" class="nav-link">博文</a>
            <a href="/category" class="nav-link">分类</a>
            <a href="/archive" class="nav-link">归档</a>
            <a href="/about" class="nav-link">关于</a>
            <a href="/login" class="nav-link login-btn">登录</a>
          </nav>
          <div class="search-container">
            <input type="text" class="search-input" placeholder="搜索博客..." />
            <button class="search-button">搜索</button>
          </div>
        </div>
      </header>

      <!-- 主体内容 -->
      <div class="main-body">
        <div class="content-inner">
          <!-- 左侧文章列表 -->
          <div class="content-left">
            <!-- 文章列表 -->
            <div class="post-list">
              <article v-for="post in posts" :key="post.id" class="post-item">
                <div class="post-header">
                  <h2 class="post-title">
                    <a :href="`/post/${post.id}`" class="post-link">{{ post.title }}</a>
                  </h2>
                  <div class="post-meta">
                    <span class="meta-date">发布于 {{ formatDate(post.publishDate) }}</span>
                    <span class="meta-category">
                      <a :href="`/category/${post.category.toLowerCase()}`" class="category-link">{{ post.category }}</a>
                    </span>
                    <span class="meta-views">阅读({{ post.views }})</span>
                    <span class="meta-comments">评论({{ post.commentsCount }})</span>
                    <span class="meta-likes">推荐({{ post.likes }})</span>
                  </div>
                </div>
                <div class="post-summary">
                  {{ post.content.slice(0, 100) }}...
                </div>
                <div class="post-footer">
                  <div class="post-tags">
                    <a v-for="tag in post.tags" :key="tag" :href="`/tag/${tag.toLowerCase()}`" class="tag">{{ tag }}</a>
                  </div>
                  <a :href="`/post/${post.id}`" class="read-more">阅读全文 »</a>
                </div>
              </article>
            </div>

            <!-- 分页 -->
            <div class="pagination-container">
              <div class="pagination">
                <span class="page-current">1</span>
                <a href="/page/2" class="page-link">2</a>
                <a href="/page/3" class="page-link">3</a>
                <a href="/page/4" class="page-link">4</a>
                <a href="/page/5" class="page-link">5</a>
                <a href="/page/2" class="page-next">下一页</a>
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
                      <span class="stat-number">{{ user.articlesCount }}</span>
                      <span class="stat-label">文章</span>
                    </div>
                    <div class="stat">
                      <span class="stat-number">{{ user.commentsCount }}</span>
                      <span class="stat-label">评论</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 文章分类 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">文章分类</h3>
              <ul class="category-list">
                <li v-for="category in categories" :key="category.id" class="category-item">
                  <a :href="`/category/${category.id}`" class="category-link">
                    <span class="category-name">{{ category.name }}</span>
                    <span class="category-count">({{ category.count }})</span>
                  </a>
                </li>
              </ul>
            </div>

            <!-- 最新评论 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">最新评论</h3>
              <ul class="comment-list">
                <li v-for="comment in recentComments" :key="comment.id" class="comment-item">
                  <div class="comment-content">
                    <span class="comment-author">{{ comment.author }}</span> 发表在
                    <a :href="`/post/${comment.postId}`" class="comment-post">{{ getPostTitleById(comment.postId) }}</a>
                  </div>
                  <div class="comment-text">{{ comment.content }}</div>
                </li>
              </ul>
            </div>

            <!-- 登录入口 -->
            <div class="sidebar-section login-section">
              <h3 class="sidebar-title">访问入口</h3>
              <p class="login-prompt">立即登录，发布你的第一篇博客</p>
              <div class="login-buttons">
                <a href="/login" class="login-button">登录</a>
                <a href="/register" class="register-button">注册</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 页脚 -->
      <footer class="site-footer">
        <div class="footer-content">
          <div class="footer-links">
            <a href="/about" class="footer-link">关于本站</a>
            <a href="/contact" class="footer-link">联系我们</a>
            <a href="/sitemap" class="footer-link">网站地图</a>
            <a href="/privacy" class="footer-link">隐私政策</a>
            <a href="/help" class="footer-link">帮助中心</a>
            <a href="/rss" class="footer-link">RSS订阅</a>
          </div>
          <div class="copyright">
            <p>Copyright © 2024 墨语博客. All Rights Reserved.</p>
            <p class="footer-note">专注于技术分享与交流， Powered by Vue.js</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/request.js'

// 响应式数据
const posts = ref([])
const categories = ref([])
const recentComments = ref([])
const user = ref({
  username: '',
  avatar: '',
  bio: '',
  postsCount: 0,
  articlesCount: 0,
  commentsCount: 0
})

// 获取文章标题的方法
const getPostTitleById = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  return post ? post.title : '未知文章'
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return ` ${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

// 从 API 获取数据
const fetchData = async () => {
  try {
    // 获取文章列表
    posts.value = await api.get('/posts')
    
    // 获取分类列表
    categories.value = await api.get('/categories')
    
    // 获取最新评论
    recentComments.value = await api.get('/comments')
    
    // 获取用户信息
    const userData = await api.get('/users/1')
    user.value = userData
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* 采用与前一页相同的 scoped 容器化布局策略，避免依赖全局 reset */

/* 使组件容器成为独立的视口级滚动区域（避免 body 默认 margin/填充影响） */
.cnblogs-fullscreen {
  position: fixed;
  inset: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei", "Segoe UI", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 内部可视宽度容器（与 header/footer 对齐） */
.cnblogs-fullscreen > .inner-wrapper {
  width: 100%;
  max-width: 1400px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  background-color: transparent;
}

/* header */
.top-header {
  width: 100%;
  background-color: #2c3e50;
  border-bottom: 3px solid #009688;
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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

.site-title { margin: 0; }
.title-link {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
}
.title-link:hover { color: #009688; }

/* nav */
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
.nav-link:hover { color: #fff; background-color: rgba(255,255,255,0.1); }
.nav-link.active { color:#009688; font-weight:bold; background-color: rgba(0,150,136,0.1); }

.login-btn {
  background-color: #009688;
  color: white;
  padding: 8px 16px;
  border-radius: 3px;
  margin-left: 10px;
}
.login-btn:hover { background-color: #00796b; }

/* search */
.search-container { display:flex; align-items:center; }
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
.search-input:focus { border-color: #009688; }
.search-button {
  padding: 6px 15px;
  background-color: #009688;
  color: white;
  border: none;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}
.search-button:hover { background-color: #00796b; }

/* 主体 */
.main-body { display:flex; width:100%; flex:1; padding:0; margin:0; box-sizing:border-box; }

/* 对齐主内容与 header-content 宽度 */
.main-body > .content-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 0;
  padding: 20px;
  box-sizing: border-box;
}

/* 左侧文章列表 */
.content-left {
  flex: 1;
  background-color: white;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
}
.post-list { width:100%; }

.post-item {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
  width: 100%;
}
.post-item:last-child { border-bottom:none; }

.post-header { margin-bottom: 15px; }
.post-title { margin-bottom: 8px; }
.post-link {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  line-height: 1.4;
}
.post-link:hover { color: #009688; text-decoration: underline; }

.post-meta {
  color: #95a5a6;
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.post-meta a { color: #009688; text-decoration: none; }
.post-meta a:hover { text-decoration: underline; }

.post-summary {
  color: #555;
  line-height: 1.7;
  margin-bottom: 15px;
  font-size: 15px;
  text-align: justify;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
.post-tags { display:flex; flex-wrap:wrap; gap:5px; }

.tag {
  background-color: #f1f8ff;
  color: #009688;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 12px;
  text-decoration: none;
  transition: all 0.3s;
}
.tag:hover { background-color:#009688; color:white; }

.read-more {
  color: #009688;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
}
.read-more:hover { text-decoration: underline; }

/* 分页 */
.pagination-container { margin-top:30px; padding-top:20px; border-top:1px solid #eee; }
.pagination { display:flex; justify-content:center; gap:5px; }
.page-current, .page-link, .page-next {
  padding:8px 12px;
  border:1px solid #ddd;
  border-radius:3px;
  color:#009688;
  text-decoration:none;
  font-size:14px;
}
.page-link:hover, .page-next:hover { background-color:#f5f5f5; }
.page-current { background-color:#009688; color:#fff; border-color:#009688; }

/* 侧栏 */
.sidebar-right {
  width: 280px;
  background-color: white;
  padding: 20px;
  margin: 0;
  border-left: 1px solid #eee;
  box-sizing: border-box;
}
.sidebar-section { margin-bottom:25px; }
.sidebar-title {
  color:#2c3e50;
  font-size:18px;
  margin-bottom:15px;
  padding-bottom:8px;
  border-bottom:2px solid #009688;
}

/* 作者信息 */
.author-info { display:flex; flex-direction:column; align-items:center; text-align:center; }
.author-avatar { width:80px; height:80px; border-radius:50%; overflow:hidden; margin-bottom:15px; background-color:#f5f5f5; }
.avatar-img { width:100%; height:100%; object-fit:cover; }
.author-name { color:#2c3e50; font-size:18px; margin-bottom:5px; }
.author-bio { color:#7f8c8d; font-size:14px; margin-bottom:15px; }
.author-stats { display:flex; justify-content:space-around; width:100%; border-top:1px solid #eee; padding-top:15px; }
.stat { display:flex; flex-direction:column; align-items:center; }
.stat-number { color:#009688; font-size:20px; font-weight:bold; }
.stat-label { color:#7f8c8d; font-size:12px; margin-top:5px; }

/* 分类、评论列表 */
.category-list, .comment-list { list-style:none; padding:0; margin:0; }
.category-item { border-bottom:1px solid #f5f5f5; padding:10px 0; }
.category-item:last-child { border-bottom:none; }
.category-link { display:flex; justify-content:space-between; text-decoration:none; color:#555; transition:color .3s; }
.category-link:hover { color:#009688; }

.comment-item { border-bottom:1px solid #f5f5f5; padding:12px 0; }
.comment-item:last-child { border-bottom:none; }
.comment-content { font-size:13px; margin-bottom:5px; }
.comment-author { color:#009688; font-weight:bold; }
.comment-post { color:#555; text-decoration:none; }
.comment-post:hover { text-decoration:underline; }
.comment-text { color:#666; font-size:13px; line-height:1.5; padding-left:10px; border-left:2px solid #eee; }

/* 登录入口 */
.login-section { text-align:center; }
.login-prompt { color:#7f8c8d; margin-bottom:20px; font-size:14px; }
.login-buttons { display:flex; gap:15px; justify-content:center; }
.login-button, .register-button {
  padding:10px 25px; border-radius:4px; text-decoration:none; font-weight:bold; transition:all .3s; font-size:14px;
}
.login-button { background-color:#009688; color:white; border:2px solid #009688; }
.login-button:hover { background-color:#00796b; border-color:#00796b; }
.register-button { background-color:transparent; color:#009688; border:2px solid #009688; }
.register-button:hover { background-color:#f8f9fa; }

/* 页脚 */
.site-footer {
  width: 100%;
  background-color: #2c3e50;
  color: #bdc3c7;
  padding: 25px 0;
  margin-top: 30px;
}
.footer-content {
  width: 100%;
  padding: 0 15px;
  text-align: center;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
}
.footer-links { display:flex; justify-content:center; gap:25px; margin-bottom:20px; flex-wrap:wrap; }
.footer-link { color:#bdc3c7; text-decoration:none; font-size:14px; transition:color .3s; }
.footer-link:hover { color:#009688; }
.copyright { color:#95a5a6; font-size:14px; line-height:1.6; }
.footer-note { margin-top:10px; font-size:13px; }

/* 响应式 */
@media (max-width: 1200px) {
  .main-body { flex-direction: column; }
  .sidebar-right {
    width: 100%;
    border-left: none;
    border-top: 1px solid #eee;
    padding: 20px 15px;
  }
  .header-content { flex-wrap: wrap; height: auto; padding: 10px 15px; }
  .main-navigation { order: 3; width: 100%; justify-content: center; margin-top: 10px; }
  .search-container { order: 2; }
}

@media (max-width: 768px) {
  .site-title { width: 100%; text-align: center; margin-bottom: 10px; }
  .header-content { flex-direction: column; height: auto; }
  .main-navigation { flex-wrap: wrap; justify-content: center; gap:5px; margin:10px 0; }
  .nav-link { padding:6px 10px; font-size:14px; }
  .search-container { width:100%; margin-top:10px; }
  .search-input { width:100%; }
  .post-footer { flex-direction: column; align-items:flex-start; gap:10px; }
  .post-meta { flex-direction: column; gap:5px; }
  .footer-links { gap:15px; }
}

@media (max-width: 480px) {
  .content-left, .sidebar-right { padding:15px 10px; }
  .post-link { font-size:18px; }
  .login-buttons { flex-direction: column; gap:10px; }
  .login-button, .register-button { width:100%; text-align:center; }
}
</style>