import { api } from './api'

const AUTH_PREFIX = '/auth'

export async function login(payload) {
  const { data } = await api.post(`${AUTH_PREFIX}/login`, payload)
  return data
}

export async function register(payload) {
  const { data } = await api.post(`${AUTH_PREFIX}/register`, payload)
  return data
}

export async function verifyEmail(token) {
  const { data } = await api.get(`${AUTH_PREFIX}/verify-email`, { params: { token } })
  return data
}

export async function resendVerification(email) {
  const { data } = await api.post(`${AUTH_PREFIX}/resend-verification`, { email })
  return data
}

export async function logout() {
  try {
    await api.post(`${AUTH_PREFIX}/logout`)
  } catch {
    // Server may not support logout endpoint; client clears token
  }
}
