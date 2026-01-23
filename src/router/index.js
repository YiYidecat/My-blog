import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '../views/Layout/GuestLayout.vue'
import UserLayout from '../views/Layout/UserLayout.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  // 游客路由
  {
    path: '/',
    name: 'guest-home',
    component: GuestLayout,
    children: [
      // {
      //   path: '',
      //   name: 'home',
      //   component: HomeView
      // },
      {
        path: 'articles',
        name: 'guest-articles',
        component: () => import('../views/HomeView.vue') // 或创建专门的文章页面
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('../views/HomeView.vue') // 或创建专门的分类页面
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/HomeView.vue') // 或创建专门的关于页面
      }
    ]
  },
  // 用户路由
  {
    path: '/dashboard',
    name: 'user-dashboard',
    component: UserLayout,
    // children: [
    //   {
    //     path: '',
    //     name: 'dashboard',
    //     component: () => import('../views/DashboardView.vue') // 可以创建一个仪表盘页面
    //   },
    //   {
    //     path: 'my-articles',
    //     name: 'my-articles',
    //     component: () => import('../views/MyArticlesView.vue') // 可以创建一个我的文章页面
    //   },
    //   {
    //     path: 'favorites',
    //     name: 'favorites',
    //     component: () => import('../views/FavoritesView.vue') // 可以创建一个收藏页面
    //   },
    //   {
    //     path: 'profile',
    //     name: 'profile',
    //     component: () => import('../views/ProfileView.vue') // 可以创建一个个人资料页面
    //   },
    //   {
    //     path: 'editor',
    //     name: 'editor',
    //     component: () => import('../views/EditorView.vue') // 可以创建一个编辑器页面
    //   }
    // ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router