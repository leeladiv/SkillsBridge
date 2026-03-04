/**
 * Admin-only API service.
 */
import { api } from './api'

const ADMIN_PREFIX = '/admin'

export async function fetchUniversityRequests() {
  const { data } = await api.get(`${ADMIN_PREFIX}/university-requests`)
  return data
}

export async function fetchStudents(params = {}) {
  const { data } = await api.get(`${ADMIN_PREFIX}/students`, { params })
  return data
}

export async function suspendUser(userId, reason) {
  const { data } = await api.post(`${ADMIN_PREFIX}/users/${userId}/suspend`, { reason })
  return data
}

export async function unsuspendUser(userId) {
  const { data } = await api.post(`${ADMIN_PREFIX}/users/${userId}/unsuspend`)
  return data
}

export async function fetchAnalytics() {
  const { data } = await api.get(`${ADMIN_PREFIX}/analytics`)
  return data
}
