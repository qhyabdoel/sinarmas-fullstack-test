import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'

// Define route records
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
]

// Create router instance
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Navigation guard for authentication
router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) next('/login')
  else next()
})

export default router
