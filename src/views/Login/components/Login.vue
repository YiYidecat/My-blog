<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="login-title">用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
            <span>
                <label for="username">用户名</label>
                <input type="text" 
                 id="username" 
                 v-model="loginForm.username" 
                 placeholder="请输入用户名"
                 required/>
            </span>
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginForm.password" 
            placeholder="请输入密码"
            required
          />
        </div>
        <button type="submit" class="login-btn">登录</button>
      </form>
      <div class="register-link">
        <p>还没有账户？<router-link to="/register">立即注册</router-link></p>
        <RouterLink to="/">前往游客浏览页面
            <i class="icon-arrow-right">></i>
            <i class="icon-arrow-right">></i>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import { ElMessage } from 'element-plus'
import { UserAPI } from '@/apis'

const router = useRouter()
const userStore = useUserStore()

const loginForm = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  try {
    // 首先尝试从API获取所有用户
    const users = await UserAPI.getAllUsers()
    
    // 查找匹配的用户(在template当中使用双向绑定v-model绑定loginForm.username和loginForm.password)
    const user = users.find(u => u.username === loginForm.value.username && u.password === loginForm.value.password)
    
    if (user) {
      // 登录成功，保存用户信息到store
      userStore.login(user)
      console.log("登录的用户是", user)

      // 显示成功消息
      ElMessage.success('登录成功')
      
      // 跳转到首页
      router.push('/dashboard')
    } else {
      // 登录失败
      ElMessage.error('用户名或密码错误')
    }
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请稍后重试')
  }
}
</script>

<style scoped>
.login-container {
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.login-form {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 500px;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
}

.input-group {
  margin-bottom: 25px;

}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 15px;
}

.input-group input {
  width: 100%;
  padding: 14px;
  border: 1px solid #e1e5eb;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #009688;
  box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.15);
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(to right, #009688 0%, #00b19d 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 10px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 150, 136, 0.3);
}

.register-link {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
}

.register-link a {
  color: #009688;
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
}

.register-link a:hover {
  text-decoration: underline;
  color: #007a6a;
}
</style>