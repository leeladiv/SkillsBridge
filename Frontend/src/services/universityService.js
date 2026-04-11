import api  from './api.js'

const PREFIX = '/universities'

export async function fetchUniversities() {
  const { data } = await api.get(PREFIX)
  return data
}

export async function requestUniversity(payload) {
  const { data } = await api.post(`${PREFIX}/request`, payload)
  return data
}

export async function fetchUniversityRequests() {
  const { data } = await api.get(`${PREFIX}/requests`)
  return data
}

export async function approveUniversity(requestId) {
  const { data } = await api.post(`${PREFIX}/requests/${requestId}/approve`)
  return data
}

export async function rejectUniversity(requestId) {
  const { data } = await api.post(`${PREFIX}/requests/${requestId}/reject`)
  return data
}

export async function addUniversity(payload) {
  const { data } = await api.post(PREFIX, payload)
  return data
}
