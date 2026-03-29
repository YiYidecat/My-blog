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
  // 单个文章详情路由
  {
    path: '/details/:id/:author',
    name: 'details',
    component: () => import('../views/Details/index.vue'),
    props: true
  },
  // 分类页面路由
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/Categories/index.vue')
  },
  // about 页面路由,介绍本项目
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About/index.vue')
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
      // }
    ]
  },
  // 用户个人资料路由
  {
    path: `/dashboard/:userId/profile`, // 使用动态路由参数
    name: 'profile',
    component: () => import('../views/Profile/index.vue'),
    children: [
      {
        path: '',
        name: 'profile-history',
        component: () => import('../views/Profile/components/History.vue') // 浏览历史模块
      }
    ]
  },
  // 用户仪表盘路由
  {
    path: `/dashboard/:userId`, // 使用动态路由参数
    name: 'dashboard',
    component: () => import('../views/Article/index.vue'),
    children: [
      {
        path: '',
        name: 'articles',
        component: () => import('../views/Article/components/ArticleDashboard.vue'), // 我的文章
      },
      {
        //路径是 /dashboard/:userId/editor/new 或 /dashboard/:userId/editor/:articleId
        path:'editor/:articleId?',
        name:'article-editor',
        component: () => import('../views/Article/components/ArticleEditor.vue') // 文章编辑器
      },
      // {
      //   path: 'favorites',
      //   name: 'favorites',
      //   component: () => import('../views/Dashboard/FavoritesView.vue') // 收藏
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