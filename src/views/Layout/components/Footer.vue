<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link to="/about" class="footer-link">关于本站</router-link>
        <router-link to="/contact" class="footer-link">联系我们</router-link>
        <router-link to="/sitemap" class="footer-link">网站地图</router-link>
        <router-link to="/privacy" class="footer-link">隐私政策</router-link>
        <router-link to="/help" class="footer-link">帮助中心</router-link>
        <router-link to="/rss" class="footer-link">RSS订阅</router-link>
      </div>
      <div class="copyright">
        <p>Copyright © 2024 墨语博客. All Rights Reserved.</p>
        <p class="footer-note">专注于技术分享与交流， Powered by Vue.js</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 页脚组件
</script>

<style scoped>
.site-footer {
  width: 100%;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 30px 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
}

.footer-links {
  margin-bottom: 15px;
}

.footer-link {
  color: #bdc3c7;
  text-decoration: none;
  margin: 0 10px;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #009688;
}

.copyright p {
  margin: 5px 0;
  font-size: 13px;
  color: #95a5a6;
}

.footer-note {
  font-style: italic;
}
</style>