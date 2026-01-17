<template>
  <div class="home">
    <h1>欢迎来到我的博客</h1>
    <el-card v-for="post in posts" :key="post.id" class="post-card">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content.slice(0, 100) }}...</p>
      <div class="actions">
        <el-button @click="likePost(post.id)" type="primary">
          ❤️ {{ post.likes }}
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
  posts.value = await api.get('/posts')
  console.log("加载到的文章:", posts.value)
}

const likePost = async (id) => {
  await api.post(`/posts/${id}/like`)
  loadPosts() // 重新加载数据
}

onMounted(loadPosts)
</script>