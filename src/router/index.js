import { createRouter, createWebHistory } from 'vue-router'
import { routeMiddleware } from './middleware'
import { auth } from './auth'
import { device } from './device'
import BaseLayout from '@/views/Layout/index'
import { sessionStore } from '@/stores/sessionStore'

import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/', redirect: '/home', component: BaseLayout, meta: { title: '主页'},
    // path: '/', redirect: '/home', component: BaseLayout, meta: { title: '主页', requireAuth: true },
    children: [
      {
        path: '/home', name: 'home', meta: { title: '主页', requireAuth: true }, component: () => import('@/views/Home.vue'),
      },
      {
        path: '/menu', name: 'menu', meta: { title: '菜单管理', isMenu: true
        }, component: () => import('@/views/SystemManagement/MenuManagement/index.vue'),
        // path: '/menu', name: 'menu', meta: { title: '菜单管理', requireAuth: true }, component: () => import('@/views/SystemManagement/MenuManagement.vue'),
      },
      {
        path: '/role', name: 'role', meta: { title: '角色管理', isMenu: true }, component: () => import('@/views/SystemManagement/RoleManagement/index.vue'),
      },
      {
        path: '/user', name: 'user', meta: { title: '账号管理', isMenu: true
        }, component: () => import('@/views/SystemManagement/UserManagement/index.vue'),
      },
      {
        path: '/logs', name: 'logs', meta: { title: '操作日志', isMenu: true
        }, component: () => import('@/views/SystemManagement/OperationLog/index.vue'),
      },
      ...device
    ]
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/HelloWorld'),
    meta: { title: 'demo', requireAuth: true }
  },

  auth,
]

const wrappedRouter = routeMiddleware(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: wrappedRouter
})

router.beforeEach(async(to, from) => {
  const isAuthenticated = sessionStore().isAuthenticated
  if (isAuthenticated) {
    if (to.name.includes('auth/login')) {
      return { path: to.query?.redirect || '/'}
    }
  }
  if (!isAuthenticated && to.meta.requireAuth) {
    ElMessage({
      message: '认证已过期，请重新登录',
      type: 'error',
      duration: 5 * 1000
    })

    return {
      path: '/auth/login',
      query: { redirect: to.fullPath },
    }
  }
})

router.beforeResolve(async to => {
  return true
})

router.afterEach(async(to, from) => {
  const title = to.meta?.title
  document.title = '云wifi虚拟化AC' + (title ? `-${title}` : '')
})

export default router
