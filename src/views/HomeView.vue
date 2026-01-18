<template>
  <div class="home">
    <h1>欢迎来到我的博客</h1>
    <el-card v-for="post in posts" :key="post.id" class="post-card">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content.slice(0, 100) }}...</p>
      <div class="actions">
        <el-button @click="likePost(post.id)" type="primary">
          ❤️ {{ post.likes || 0 }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/request.js'

const posts = ref([])

const loadPosts = async () => {
  try {
    const response = await api.get('/posts')
    // 从JSON Server获取的数据应该是数组
    posts.value = Array.isArray(response) ? response : (response || [])
    console.log("加载到的文章:", posts.value)
  } catch (error) {
    console.error('加载文章失败:', error)
    posts.value = []
  }
}

const likePost = async (id) => {
  try {
    // 获取当前文章
    const response = await api.get(`/posts/${id}`)
    // JSON Server返回的就是文章对象，所以不需要访问 .data
    const post = response
    
    // 检查是否已有点赞数，如果没有则默认为0
    const currentLikes = typeof post.likes !== 'undefined' ? post.likes : 0
    
    // 更新点赞数
    await api.patch(`/posts/${id}`, {
      likes: currentLikes + 1
    })
    
    loadPosts() // 重新加载数据
  } catch (error) {
    console.error('点赞失败:', error)
  }
}

onMounted(loadPosts)
</script>

<style scoped>
.home {
  padding: 20px;
}

.post-card {
  margin-bottom: 20px;
}

.actions {
  text-align: center;
}
</style>