<template>
  <div class="register-container">
    <div class="register-form">
      <h2 class="register-title">用户注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="reg-username">用户名</label>
          <input 
            type="text" 
            id="reg-username" 
            v-model="registerForm.username" 
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="input-group">
          <label for="reg-email">邮箱</label>
          <input 
            type="email" 
            id="reg-email" 
            v-model="registerForm.email" 
            placeholder="请输入邮箱地址"
            required
          />
        </div>
        <div class="input-group">
          <label for="reg-password">密码</label>
          <input 
            type="password" 
            id="reg-password" 
            v-model="registerForm.password" 
            placeholder="请输入密码"
            required
          />
        </div>
        <div class="input-group">
          <label for="reg-confirm-password">确认密码</label>
          <input 
            type="password" 
            id="reg-confirm-password" 
            v-model="confirmPassword" 
            placeholder="请再次输入密码"
            required
          />
        </div>
        <button type="submit" class="register-btn">注册</button>
      </form>
      <div class="login-link">
        <p>已有账户？<router-link to="/login">立即登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { UserAPI } from '@/apis'

const router = useRouter()

const registerForm = ref({
  username: '',
  email: '',
  password: ''
})

const confirmPassword = ref('')

const handleRegister = async () => {
  // 验证两次密码输入是否一致
  if (registerForm.value.password !== confirmPassword.value) {
    ElMessage.error('两次输入的密码不一致')
    return
  }

  try {
    // 检查用户名是否已存在
    const users = await UserAPI.getAllUsers()
    const existingUser = users.find(u => u.username === registerForm.value.username)
    
    if (existingUser) {
      ElMessage.error('用户名已存在')
      return
    }

    // 创建新用户
    const newUser = {
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
      bio: '新用户',
      avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23${Math.floor(Math.random()*16777215).toString(16)}'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='30' font-weight='bold'%3E${registerForm.value.username.charAt(0).toUpperCase()}%3C/text%3E%3C/svg%3E`,
      postsCount: 0,
      followersCount: 0,
      followingCount: 0,
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }

    // 由于json-server的限制，我们需要先获取所有用户再添加新用户
    // 这里我们直接模拟向后端发送请求
    // 实际项目中这里应该是调用API创建用户
    await UserAPI.createUser(newUser)
    
    ElMessage.success('注册成功，请登录')
    router.push('/login')
  } catch (error) {
    console.error('注册失败:', error)
    ElMessage.error('注册失败，请稍后重试')
  }
}
</script>

<style scoped>
.register-container {
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.register-form {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 500px;
}

.register-title {
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

.register-btn {
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

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 150, 136, 0.3);
}

.login-link {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
}

.login-link a {
  color: #009688;
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
}

.login-link a:hover {
  text-decoration: underline;
  color: #007a6a;
}
</style>