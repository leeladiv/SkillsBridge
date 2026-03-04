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

export async function logout() {
  try {
    await api.post(`${AUTH_PREFIX}/logout`)
  } catch {
    // Server may not support logout endpoint; client clears token
  }
}
