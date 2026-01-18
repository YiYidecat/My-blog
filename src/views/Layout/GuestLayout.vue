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
              <article class="post-item">
                <div class="post-header">
                  <h2 class="post-title">
                    <a href="/post/1" class="post-link">Vue3响应式原理深度解析与实战应用</a>
                  </h2>
                  <div class="post-meta">
                    <span class="meta-date">发布于 2024-01-15 10:30</span>
                    <span class="meta-category">
                      <a href="/category/frontend" class="category-link">前端技术</a>
                    </span>
                    <span class="meta-views">阅读(1256)</span>
                    <span class="meta-comments">评论(24)</span>
                    <span class="meta-likes">推荐(18)</span>
                  </div>
                </div>
                <div class="post-summary">
                  深入探讨Vue3的响应式系统是如何工作的，包括Proxy的使用、依赖收集和触发更新的机制。本文将详细介绍reactive、ref、computed等API的内部实现原理，并结合实际项目中的使用场景，分享性能优化和最佳实践...
                </div>
                <div class="post-footer">
                  <div class="post-tags">
                    <a href="/tag/vue" class="tag">Vue</a>
                    <a href="/tag/javascript" class="tag">JavaScript</a>
                    <a href="/tag/frontend" class="tag">前端</a>
                    <a href="/tag/reactivity" class="tag">响应式</a>
                  </div>
                  <a href="/post/1" class="read-more">阅读全文 »</a>
                </div>
              </article>

              <article class="post-item">
                <div class="post-header">
                  <h2 class="post-title">
                    <a href="/post/2" class="post-link">Node.js性能优化实战：从代码到架构的全面调优</a>
                  </h2>
                  <div class="post-meta">
                    <span class="meta-date">发布于 2024-01-10 14:22</span>
                    <span class="meta-category">
                      <a href="/category/backend" class="category-link">后端技术</a>
                    </span>
                    <span class="meta-views">阅读(892)</span>
                    <span class="meta-comments">评论(18)</span>
                    <span class="meta-likes">推荐(12)</span>
                  </div>
                </div>
                <div class="post-summary">
                  如何让你的Node.js应用运行得更快，从代码层面到系统层面的优化策略。包括事件循环优化、内存管理、集群模式使用、异步编程最佳实践等内容。本文将通过实际案例展示如何识别性能瓶颈并进行针对性优化...
                </div>
                <div class="post-footer">
                  <div class="post-tags">
                    <a href="/tag/nodejs" class="tag">Node.js</a>
                    <a href="/tag/performance" class="tag">性能优化</a>
                    <a href="/tag/backend" class="tag">后端</a>
                    <a href="/tag/server" class="tag">服务器</a>
                  </div>
                  <a href="/post/2" class="read-more">阅读全文 »</a>
                </div>
              </article>

              <article class="post-item">
                <div class="post-header">
                  <h2 class="post-title">
                    <a href="/post/3" class="post-link">React Hooks最佳实践与高级用法详解</a>
                  </h2>
                  <div class="post-meta">
                    <span class="meta-date">发布于 2024-01-05 09:15</span>
                    <span class="meta-category">
                      <a href="/category/frontend" class="category-link">前端技术</a>
                    </span>
                    <span class="meta-views">阅读(1043)</span>
                    <span class="meta-comments">评论(32)</span>
                    <span class="meta-likes">推荐(21)</span>
                  </div>
                </div>
                <div class="post-summary">
                  掌握React Hooks的高级用法和注意事项，包括自定义Hook的设计、useEffect的依赖项处理、useMemo和useCallback的性能优化，以及常见陷阱的避免方法。本文还将分享在大型项目中如何组织和管理Hooks代码...
                </div>
                <div class="post-footer">
                  <div class="post-tags">
                    <a href="/tag/react" class="tag">React</a>
                    <a href="/tag/hooks" class="tag">Hooks</a>
                    <a href="/tag/frontend" class="tag">前端</a>
                    <a href="/tag/javascript" class="tag">JavaScript</a>
                  </div>
                  <a href="/post/3" class="read-more">阅读全文 »</a>
                </div>
              </article>

              <article class="post-item">
                <div class="post-header">
                  <h2 class="post-title">
                    <a href="/post/4" class="post-link">TypeScript高级类型编程：从入门到精通</a>
                  </h2>
                  <div class="post-meta">
                    <span class="meta-date">发布于 2023-12-28 16:45</span>
                    <span class="meta-category">
                      <a href="/category/frontend" class="category-link">前端技术</a>
                    </span>
                    <span class="meta-views">阅读(756)</span>
                    <span class="meta-comments">评论(15)</span>
                    <span class="meta-likes">推荐(9)</span>
                  </div>
                </div>
                <div class="post-summary">
                  TypeScript的类型系统提供了强大的类型编程能力，可以创建复杂的类型约束和转换。本文将深入讲解条件类型、映射类型、索引类型、模板字面量类型等高级特性，并展示如何在实战项目中应用这些技术...
                </div>
                <div class="post-footer">
                  <div class="post-tags">
                    <a href="/tag/typescript" class="tag">TypeScript</a>
                    <a href="/tag/typing" class="tag">类型系统</a>
                    <a href="/tag/frontend" class="tag">前端</a>
                    <a href="/tag/programming" class="tag">编程</a>
                  </div>
                  <a href="/post/4" class="read-more">阅读全文 »</a>
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
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23009688'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='30' font-weight='bold'%3E墨%3C/text%3E%3C/svg%3E"
                    alt="博主头像"
                    class="avatar-img"
                  />
                </div>
                <div class="author-details">
                  <h4 class="author-name">墨语</h4>
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
// 本组件不含额外脚本逻辑，保留空脚本以便未来扩展
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
