import api from './api.js'

const MESSAGES_PREFIX = '/messages'

export async function sendMessage(payload) {
  const { data } = await api.post(MESSAGES_PREFIX, payload)
  return data
}

export async function fetchInbox(params = {}) {
  const { data } = await api.get(`${MESSAGES_PREFIX}/inbox`, { params })
  return data
}

export async function markRead(messageId) {
  const { data } = await api.post(`${MESSAGES_PREFIX}/read`, { messageId })
  return data
}

