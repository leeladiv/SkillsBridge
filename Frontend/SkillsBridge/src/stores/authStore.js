/**
 * Authentication state and actions.
 * Token is stored in localStorage for persistence.
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authService from '../services/authService'
import { ROLES } from '../types'

const TOKEN_KEY = 'skillsbridge_token'
const USER_KEY = 'skillsbridge_user'
const ROLE_KEY = 'skillsbridge_role'

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function getStoredRole() {
  return localStorage.getItem(ROLE_KEY) || null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(getStoredToken())
  const user = ref(getStoredUser())
  const role = ref(getStoredRole())

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isStudent = computed(() => role.value === ROLES.STUDENT)
  const isAdmin = computed(() => role.value === ROLES.ADMIN)

  function setAuth(payload) {
    token.value = payload.token
    user.value = payload.user
    role.value = payload.role || ROLES.STUDENT
    if (payload.token) localStorage.setItem(TOKEN_KEY, payload.token)
    if (payload.user) localStorage.setItem(USER_KEY, JSON.stringify(payload.user))
    if (payload.role) localStorage.setItem(ROLE_KEY, payload.role)
  }

  function clearAuth() {
    token.value = null
    user.value = null
    role.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(ROLE_KEY)
  }

  async function login(credentials) {
    try {
      const data = await authService.login(credentials)
      setAuth(data)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed'
      return { success: false, error: message }
    }
  }

  async function register(payload) {
    try {
      const data = await authService.register(payload)
      setAuth(data)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed'
      return { success: false, error: message }
    }
  }

  async function logout() {
    await authService.logout()
    clearAuth()
  }

  /** Restore auth from localStorage (e.g. on page refresh). */
  function hydrate() {
    token.value = getStoredToken()
    user.value = getStoredUser()
    role.value = getStoredRole()
  }

  return {
    token,
    user,
    role,
    isAuthenticated,
    isStudent,
    isAdmin,
    login,
    register,
    logout,
    setAuth,
    clearAuth,
    hydrate,
  }
})
