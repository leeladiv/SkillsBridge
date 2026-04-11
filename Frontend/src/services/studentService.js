import  api from './api.js'

export default api

const STUDENT_PREFIX = '/students'

export async function fetchProfile() {
  const { data } = await api.get(`${STUDENT_PREFIX}/me`)
  return data
}

export async function updateProfile(payload) {
  const { data } = await api.put(`${STUDENT_PREFIX}/me`, payload)
  return data
}

export async function updateSkills(skills) {
  const { data } = await api.put(`${STUDENT_PREFIX}/me/skills`, { skills })
  return data
}

export async function setVisibility(isPublic) {
  const { data } = await api.patch(`${STUDENT_PREFIX}/me/visibility`, { isPublic })
  return data
}

export async function fetchProjects() {
  const { data } = await api.get(`${STUDENT_PREFIX}/me/projects`)
  return data
}

export async function createProject(payload) {
  const { data } = await api.post(`${STUDENT_PREFIX}/me/projects`, payload)
  return data
}

export async function updateProject(projectId, payload) {
  const { data } = await api.patch(`${STUDENT_PREFIX}/me/projects/${projectId}`, payload)
  return data
}

export async function deleteProject(projectId) {
  await api.delete(`${STUDENT_PREFIX}/me/projects/${projectId}`)
}

export async function uploadProjectFile(projectId, file) {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await api.post(`/projects/${projectId}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function deleteAccount() {
  const { data } = await api.delete(`${STUDENT_PREFIX}/me`)
  return data
}
