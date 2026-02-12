import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../views/Layout/index.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login/index.vue'
import ResumePage from '@/components/ResumePage.vue' // 新增简历页面

const routes = [
  // 添加新的简历页面路由
  {
    path: '/resume',
    name: 'Resume',
    component: ResumePage
  },
  // 登录路由
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    children: [
      {
        path: '',
        name: 'login-form',
        component: () => import('../views/Login/components/Login.vue')
      }
    ]
  },
  // 注册路由
  {
    path: '/register',
    name: 'register',
    component: LoginView,
    children: [
      {
        path: '',
        name: 'register-form',
        component: () => import('../views/Login/components/Register.vue')
      }
    ]
  },
  // 主页路由（使用统一布局）
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      // {
      //   path: 'blog',
      //   name: 'blog',
      //   component: () => import('../views/BlogView.vue') // 博文页面
      // },
      // {
      //   path: 'category',
      //   name: 'category',
      //   component: () => import('../views/CategoryView.vue') // 分类页面
      // },
      // {
      //   path: 'archive',
      //   name: 'archive',
      //   component: () => import('../views/ArchiveView.vue') // 归档页面
      // },
      // {
      //   path: 'about',
      //   name: 'about',
      //   component: () => import('../views/AboutView.vue') // 关于页面
      // },
      // {
      //   path: 'post/:id',
      //   name: 'post-detail',
      //   component: () => import('../views/PostDetailView.vue'), // 文章详情页
      //   props: true
      // }
    ]
  },
  // 用户仪表盘路由
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Layout,
    children: [
      // {
      //   path: '',
      //   name: 'dashboard-home',
      //   component: () => import('../views/Dashboard/DashboardHome.vue') // 仪表盘主页
      // },
      // {
      //   path: 'articles',
      //   name: 'articles',
      //   component: () => import('../views/Dashboard/ArticlesView.vue') // 我的文章
      // },
      // {
      //   path: 'favorites',
      //   name: 'favorites',
      //   component: () => import('../views/Dashboard/FavoritesView.vue') // 收藏
      // },
      // {
      //   path: 'profile',
      //   name: 'profile',
      //   component: () => import('../views/Dashboard/ProfileView.vue') // 个人资料
      // },
      // {
      //   path: 'editor',
      //   name: 'editor',
      //   component: () => import('../views/Dashboard/EditorView.vue') // 编辑器
      // },
      // {
      //   path: 'settings',
      //   name: 'settings',
      //   component: () => import('../views/Dashboard/SettingsView.vue') // 设置
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 使用 Hash 模式，适用于 GitHub Pages
  routes
})

export default router