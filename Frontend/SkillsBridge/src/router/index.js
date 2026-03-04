/**
 * Vue Router configuration with role-based guards.
 */
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { ROLES } from '../types'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/LandingView.vue'),
    meta: { public: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: { public: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { public: true },
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('../views/ExploreView.vue'),
    meta: { public: true },
  },
  {
    path: '/profile/:id',
    name: 'PublicProfile',
    component: () => import('../views/PublicProfileView.vue'),
    meta: { public: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { role: ROLES.STUDENT },
    children: [],
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: () => import('../views/EditProfileView.vue'),
    meta: { role: ROLES.STUDENT },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminView.vue'),
    meta: { role: ROLES.ADMIN },
  },
  {
    path: '/admin/universities',
    name: 'AdminUniversities',
    component: () => import('../views/AdminUniversitiesView.vue'),
    meta: { role: ROLES.ADMIN },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { public: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  authStore.hydrate()

  const isPublic = to.meta.public === true
  const requiredRole = to.meta.role

  if (isPublic) {
    return next()
  }

  if (!authStore.isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  if (requiredRole && authStore.role !== requiredRole) {
    if (authStore.role === ROLES.ADMIN) {
      return next({ name: 'Admin' })
    }
    if (authStore.role === ROLES.STUDENT) {
      return next({ name: 'Dashboard' })
    }
    return next({ name: 'Home' })
  }

  next()
})

export default router
