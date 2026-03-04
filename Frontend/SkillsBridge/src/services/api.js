/**
 * Central Axios instance for SkillsBridge.
 * Base URL and interceptors are configured for backend integration.
 */
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('skillsbridge_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: unwrap { success, data } and handle 401
api.interceptors.response.use(
  (response) => {
    if (response.data?.success === true && Object.prototype.hasOwnProperty.call(response.data, 'data')) {
      response.data = response.data.data
    }
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('skillsbridge_token')
      localStorage.removeItem('skillsbridge_user')
      localStorage.removeItem('skillsbridge_role')
      // Redirect to login only if we're not already on a public page
      const publicPaths = ['/', '/login', '/register', '/explore', '/profile']
      const isPublic = publicPaths.some((p) => {
        const path = window.location.pathname
        if (p === '/profile') return path.startsWith('/profile/')
        return path === p
      })
      if (!isPublic) {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
      }
    }
    return Promise.reject(error)
  }
)

export default api
