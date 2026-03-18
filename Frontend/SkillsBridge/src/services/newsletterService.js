import { api } from './api'

export async function subscribe(email) {
  const { data } = await api.post('/newsletter/subscribe', { email })
  return data
}

