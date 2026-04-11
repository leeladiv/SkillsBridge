import api  from './api.js'

export async function subscribe(email) {
  const { data } = await api.post('/newsletter/subscribe', { email })
  return data
}

