<template>
  <div class="history-container">
    <h2 class="section-title">浏览历史</h2>
    
    <!-- 浏览历史列表 -->
    <div class="history-list" v-if="historyStore.historyList.length > 0">
      <article v-for="(post, index) in historyStore.historyList" :key="`${post.id}-${index}`" class="post-item">
        <div class="post-header">
          <h2 class="post-title">
            <router-link :to="`/details/${post.id}/${post.author}`" class="post-link">{{ post.title }}</router-link>
          </h2>
          <div class="post-meta">
            <span class="meta-date">发布于 {{ formatDate(post.publishDate) }}</span>
            <span class="meta-category">
              <router-link :to="`/category/${post.category.toLowerCase()}`" class="category-link">{{ post.category }}</router-link>
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
            <router-link v-for="tag in post.tags" :key="tag" :to="`/tag/${tag.toLowerCase()}`" class="tag">{{ tag }}</router-link>
          </div>
          <router-link :to="`/details/${post.id}/${post.author}`" class="read-more">阅读全文 »</router-link>
        </div>
      </article>
    </div>
    
    <!-- 无历史记录提示 -->
    <div class="empty-history" v-else>
      <p>暂无浏览历史</p>
    </div>
    
    <!-- 清空历史按钮 -->
    <div class="history-actions" v-if="historyStore.historyList.length > 0">
      <button @click="clearHistory" class="clear-btn">清空历史</button>
    </div>
  </div>
</template>

<script setup>
import { useHistoryStore } from '@/stores/historyStore.js'
import { useRouter } from 'vue-router'

// 获取浏览历史状态管理实例
const historyStore = useHistoryStore()
const router = useRouter()

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return ` ${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

// 清空历史记录
const clearHistory = () => {
  historyStore.deleteAllHistory()
}
</script>

<style scoped>
.history-container {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #009688;
}

.history-list {
  margin-bottom: 20px;
}

/* 文章列表样式 */
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

.empty-history {
  text-align: center;
  color: #95a5a6;
  font-size: 16px;
  padding: 40px 0;
}

.history-actions {
  text-align: center;
  margin-top: 20px;
}

.clear-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}
.clear-btn:hover {
  background-color: #c0392b;
}
</style>