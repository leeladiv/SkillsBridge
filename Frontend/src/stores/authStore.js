/**
 * Authentication state and actions.
 * Token is stored in localStorage for persistence.
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authService from '../services/authService'
import * as studentService from '../services/studentService'
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

  function toPersistedUser(u) {
    if (!u) return null
    const safe = { ...u }
    // Avoid localStorage quota errors from large base64 images or big blobs.
    // Keep these in-memory only.
    delete safe.image
    delete safe.contactInfo
    delete safe.bio
    return safe
  }

  function setAuth(payload) {
    token.value = payload.token
    user.value = payload.user
    role.value = payload.role || ROLES.STUDENT
    try {
      if (payload.token) localStorage.setItem(TOKEN_KEY, payload.token)
      if (payload.user) localStorage.setItem(USER_KEY, JSON.stringify(toPersistedUser(payload.user)))
      if (payload.role) localStorage.setItem(ROLE_KEY, payload.role)
    } catch {
      // If storage quota is exceeded, keep session in-memory and persist only token/role.
      try {
        if (payload.token) localStorage.setItem(TOKEN_KEY, payload.token)
        if (payload.role) localStorage.setItem(ROLE_KEY, payload.role)
        localStorage.removeItem(USER_KEY)
      } catch {
        // ignore
      }
    }
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

  async function loginAdmin(credentials) {
    try {
      const data = await authService.adminLogin(credentials)
      setAuth(data)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Admin login failed'
      return { success: false, error: message }
    }
  }

  async function register(payload) {
    try {
      const data = await authService.register(payload)
      if (data.token) {
        setAuth(data)
      }
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

  // Fetch latest user details (e.g. avatar image) without persisting large fields.
  async function refreshUser() {
    if (!token.value || !role.value) return null
    if (role.value === ROLES.STUDENT) {
      const profile = await studentService.fetchProfile()
      user.value = {
        ...(user.value || {}),
        id: profile.id,
        fullName: profile.fullName,
        email: profile.email,
        role: role.value,
        image: profile.image,
      }
      return user.value
    }
    return user.value
  }

  return {
    token,
    user,
    role,
    isAuthenticated,
    isStudent,
    isAdmin,
    login,
    loginAdmin,
    register,
    logout,
    setAuth,
    clearAuth,
    hydrate,
    refreshUser,
  }
})
