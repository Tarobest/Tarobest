import { createRouter, createWebHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'

// 开始定义我们的路由器
const routes: RouteRecordRaw[] = [
  {
    path:'/home',
    component:() => import("@/views/home/index.vue")
  },
  {
    path:"/about",
    component:() => import("@/views/about/index.vue")
  },
  {
    // 开始重定向
    path:"/",
    redirect:'/home'
  }
]

// 开始使用我们的那个router
const router = createRouter({
  routes,  // 配置路由
  history: createWebHistory(),  // 模式
})

// 实现导出路由
export default router;