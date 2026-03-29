/**
 * Vue Router configuration with role-based guards.
 */
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useThemeStore } from '../stores/themeStore'
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
    path: '/admin-login',
    name: 'AdminLogin',
    component: () => import('../views/AdminLoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPasswordView.vue'),
    meta: { public: true },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/ResetPasswordView.vue'),
    meta: { public: true },
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: () => import('../views/VerifyEmailView.vue'),
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
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: { role: ROLES.STUDENT },
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/MessagesView.vue'),
    meta: { role: ROLES.STUDENT },
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: () => import('../views/EditProfileView.vue'),
    meta: { role: ROLES.STUDENT },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsView.vue'),
    meta: { role: ROLES.STUDENT },
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('../views/PreviewView.vue'),
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
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('../views/AdminUsersView.vue'),
    meta: { role: ROLES.ADMIN },
  },
  {
    path: '/admin/reports',
    name: 'AdminReports',
    component: () => import('../views/AdminReportsView.vue'),
    meta: { role: ROLES.ADMIN },
  },
  {
    path: '/admin/settings',
    name: 'AdminSettings',
    component: () => import('../views/AdminSettingsView.vue'),
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

  // Ensure theme is consistently applied across navigation/hot reload.
  // This prevents the UI from being stuck in dark mode when it's turned off.
  const themeStore = useThemeStore()
  themeStore.hydrate()

  const isPublic = to.meta.public === true
  const requiredRole = to.meta.role

  if (isPublic) {
    return next()
  }

  if (!authStore.isAuthenticated) {
    if (requiredRole === ROLES.ADMIN) {
      return next({ name: 'AdminLogin', query: { redirect: to.fullPath } })
    }
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
