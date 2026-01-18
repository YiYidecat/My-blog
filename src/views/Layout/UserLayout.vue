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
            <router-link to="/" class="nav-link" active-class="active">首页</router-link>
            <router-link to="/dashboard" class="nav-link" active-class="active">仪表盘</router-link>
            <router-link to="/articles" class="nav-link" active-class="active">我的文章</router-link>
            <router-link to="/favorites" class="nav-link" active-class="active">收藏</router-link>
            <router-link to="/profile" class="nav-link" active-class="active">个人资料</router-link>
            
            <!-- 用户下拉菜单 -->
            <div class="user-menu">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <img :src="userAvatar" alt="头像" class="avatar">
                  {{ userName }}
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
          <!-- 左侧内容区域 -->
          <div class="content-left">
            <!-- 主内容区 -->
            <section class="main-content">
              <router-view />
            </section>
            
            <!-- 分页 -->
            <div class="pagination-container" v-if="showPagination">
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
                  <img :src="userAvatar" 
                       alt="博主头像" class="avatar-img" />
                </div>
                <div class="author-details">
                  <h4 class="author-name">{{ userName }}</h4>
                  <p class="author-bio">全栈开发者，专注于Web技术分享</p>
                  <div class="author-stats">
                    <div class="stat">
                      <span class="stat-number">42</span>
                      <span class="stat-label">随笔</span>
                    </div>
                    <div class="stat">
                      <span class="stat-number">128</span>
                      <span class="stat-label">文章</span>
                    </div>
                    <div class="stat">
                      <span class="stat-number">256</span>
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
                <li class="category-item">
                  <a href="/category/frontend" class="category-link">
                    <span class="category-name">前端技术</span>
                    <span class="category-count">(18)</span>
                  </a>
                </li>
                <li class="category-item">
                  <a href="/category/backend" class="category-link">
                    <span class="category-name">后端技术</span>
                    <span class="category-count">(12)</span>
                  </a>
                </li>
                <li class="category-item">
                  <a href="/category/database" class="category-link">
                    <span class="category-name">数据库</span>
                    <span class="category-count">(8)</span>
                  </a>
                </li>
                <li class="category-item">
                  <a href="/category/devops" class="category-link">
                    <span class="category-name">DevOps</span>
                    <span class="category-count">(6)</span>
                  </a>
                </li>
                <li class="category-item">
                  <a href="/category/algorithm" class="category-link">
                    <span class="category-name">算法与数据结构</span>
                    <span class="category-count">(5)</span>
                  </a>
                </li>
                <li class="category-item">
                  <a href="/category/tools" class="category-link">
                    <span class="category-name">开发工具</span>
                    <span class="category-count">(3)</span>
                  </a>
                </li>
              </ul>
            </div>

            <!-- 最新评论 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">最新评论</h3>
              <ul class="comment-list">
                <li class="comment-item">
                  <div class="comment-content">
                    <span class="comment-author">开发者小王</span> 发表在
                    <a href="/post/1" class="comment-post">Vue3响应式原理深度解析</a>
                  </div>
                  <div class="comment-text">这篇文章对我帮助很大，解决了困扰已久的问题！</div>
                </li>
                <li class="comment-item">
                  <div class="comment-content">
                    <span class="comment-author">前端小白</span> 发表在
                    <a href="/post/3" class="comment-post">React Hooks最佳实践</a>
                  </div>
                  <div class="comment-text">讲解得非常清晰，特别是useEffect的部分。</div>
                </li>
                <li class="comment-item">
                  <div class="comment-content">
                    <span class="comment-author">Node爱好者</span> 发表在
                    <a href="/post/2" class="comment-post">Node.js性能优化实战</a>
                  </div>
                  <div class="comment-text">性能优化技巧很实用，已经在项目中应用了。</div>
                </li>
              </ul>
            </div>

            <!-- 功能入口 -->
            <div class="sidebar-section login-section">
              <h3 class="sidebar-title">功能入口</h3>
              <div class="login-buttons">
                <router-link to="/editor" class="login-button">写文章</router-link>
                <router-link to="/settings" class="register-button">设置</router-link>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import { ElMessage } from 'element-plus'
import { 
  ArrowDown, 
  House, 
  EditPen, 
  Collection, 
  Comment, 
  User 
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

// 示例用户信息
const userName = ref(userStore.user?.username || '用户')
const userAvatar = ref(userStore.user?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')

// 根据当前路由决定是否显示分页
const showPagination = computed(() => {
  return ['/dashboard', '/articles'].includes(router.currentRoute.value.path)
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
</script>

<style scoped>
/* ------------------------
   完整替换样式（Scoped）
   说明：.cnblogs-fullscreen 作为一个“视口级”固定滚动容器，
   因此不会受 body margin 的影响，适用于必须使用 scoped 的场景。
   ------------------------ */

/* 组件级“reset” —— 仅作用于组件内元素（不会影响全局 html/body） */
.cnblogs-fullscreen {
  /* 使容器填满视口，忽略 body 的默认 margin/填充导致的空白 */
  position: fixed;
  inset: 0;                   /* top:0; right:0; bottom:0; left:0; */
  overflow: auto;             /* 内容超出则滚动 */
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  /* 限制内部内容宽度并居中显示（如果需要贴左可把 margin 调为 0） */
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Microsoft YaHei", "Segoe UI", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

/* 内部实际可视宽度盒子（保持你的 1400px 设计，但在小屏上可缩放） */
.cnblogs-fullscreen > .inner-wrapper {
  width: 100%;
  max-width: 1400px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0; /* 已由根容器居中 */
  background-color: transparent; /* 根背景已设定 */
  box-sizing: border-box;
}

/* --------------------------
   顶部导航栏（header） ---- 保持在容器顶部且不遮挡内容
   使用 sticky：它会相对于 .cnblogs-fullscreen 的滚动容器粘性定位
   -------------------------- */
.top-header {
  width: 100%;
  background-color: #2c3e50;
  border-bottom: 3px solid #009688;
  position: sticky;
  top: 0;                /* sticky 在固定容器中参考容器顶部 */
  z-index: 1000;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 60px;          /* 固定高度，便于内容对齐 */
  display: flex;
  align-items: center;
}

/* header 内部内容限制宽度并居中（与 inner-wrapper 对齐） */
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

/* 站点标题 */
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

/* 主导航 */
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

/* 搜索 */
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

/* 用户菜单样式 */
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

/* --------------------------
   主体布局区域（header 下方）：
   使用一个横向 flex 布局：左侧主内容自适应、右侧边栏固定宽度
   -------------------------- */
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

/* 内部再包一层让左右两部分与 header-content 同宽度对齐 */
.main-body > .content-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 0;
  padding: 20px; /* 页面内边距，原来 content-left 的 padding 可保留在此处 */
  box-sizing: border-box;
}

/* 左侧内容区域（主内容） */
.content-left {
  flex: 1;
  background-color: white;
  padding: 20px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}
.main-content {
  width: 100%;
  min-height: 500px;
}

/* 分页 */
.pagination-container {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
}
.page-current, .page-link, .page-next {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 3px;
  color: #009688;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
}
.page-link:hover, .page-next:hover {
  background-color: #f5f5f5;
}
.page-current {
  background-color: #009688;
  color: white;
  border-color: #009688;
}

/* 右侧边栏 */
.sidebar-right {
  width: 280px;
  background-color: white;
  padding: 20px;
  margin: 0;
  border-left: 1px solid #eee;
  box-sizing: border-box;
}

/* 侧栏小模块 */
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

/* 博主信息 */
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

/* 分类列表 */
.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.category-item {
  border-bottom: 1px solid #f5f5f5;
  padding: 10px 0;
}
.category-item:last-child {
  border-bottom: none;
}
.category-link {
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: #555;
  transition: color 0.3s;
}
.category-link:hover {
  color: #009688;
}
.category-name {
  font-size: 14px;
}
.category-count {
  color: #95a5a6;
  font-size: 13px;
}

/* 评论列表 */
.comment-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.comment-item {
  border-bottom: 1px solid #f5f5f5;
  padding: 12px 0;
}
.comment-item:last-child {
  border-bottom: none;
}
.comment-content {
  font-size: 13px;
  margin-bottom: 5px;
}
.comment-author {
  color: #009688;
  font-weight: bold;
}
.comment-post {
  color: #555;
  text-decoration: none;
}
.comment-post:hover {
  text-decoration: underline;
}
.comment-text {
  color: #666;
  font-size: 13px;
  line-height: 1.5;
  padding-left: 10px;
  border-left: 2px solid #eee;
}

/* 功能入口 */
.login-section {
  text-align: center;
}
.login-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}
.login-button, .register-button {
  padding: 10px 25px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
  font-size: 14px;
  display: inline-block;
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
  color: #009688;
  border: 2px solid #009688;
}
.register-button:hover {
  background-color: #009688;
  color: white;
}

/* 页脚（放在 inner-wrapper 底部） */
.site-footer {
  background-color: #2c3e50;
  color: #bdc3c7;
  padding: 20px 0;
  width: 100%;
  margin-top: auto;
}
.footer-content {
  padding: 0 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
}
.footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
}
.footer-link {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}
.footer-link:hover {
  color: #009688;
}
.copyright {
  text-align: center;
  font-size: 13px;
  line-height: 1.6;
}
.copyright p {
  margin-bottom: 5px;
}
.footer-note {
  color: #95a5a6;
}

/* 响应式处理 */
@media (max-width: 1420px) {
  .cnblogs-fullscreen > .inner-wrapper { width: 95%; }
  .header-content { max-width: 100%; }
  .footer-content { max-width: 100%; }
}
@media (max-width: 768px) {
  .cnblogs-fullscreen > .inner-wrapper { width: 100%; padding: 0; }
  .header-content { flex-wrap: wrap; height: auto; padding: 10px 15px; gap: 10px; }
  .site-title { order: 1; width: 100%; text-align: center; }
  .main-navigation { order: 3; width: 100%; justify-content: center; margin: 10px 0; }
  .search-container { order: 2; width: 100%; justify-content: center; margin: 10px 0; }
  .main-body { flex-direction: column; }
  .main-body > .content-inner { flex-direction: column; padding: 10px; }
  .content-left { width: 100%; padding: 15px; }
  .sidebar-right { width: 100%; border-left: none; border-top: 1px solid #eee; padding-top: 15px; }
  .footer-links { flex-direction: column; align-items: center; }
}
</style>
