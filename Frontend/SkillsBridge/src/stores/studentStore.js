import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as studentService from '../services/studentService'

export const useStudentStore = defineStore('student', () => {
  const profile = ref(null)
  const projects = ref([])
  const skills = ref([])
  const visibility = ref(true)
  const loading = ref(false)
  const error = ref(null)

  async function fetchProfile() {
    loading.value = true
    error.value = null
    try {
      const data = await studentService.fetchProfile()
      profile.value = data
      skills.value = Array.isArray(data.skills) ? data.skills : []
      visibility.value = data.isPublic ?? true
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateProfile(payload) {
    loading.value = true
    error.value = null
    try {
      const profilePayload = {
        fullName: payload.fullName,
        bio: payload.bio,
        image: payload.image,
        contactInfo: payload.contactInfo,
        isPublic: payload.isPublic,
      }
      Object.keys(profilePayload).forEach((k) => {
        if (profilePayload[k] === undefined) delete profilePayload[k]
      })

      const data = await studentService.updateProfile(profilePayload)
      profile.value = data
      visibility.value = data.isPublic ?? true

      if (payload.skills !== undefined) {
        await studentService.updateSkills(payload.skills)
        skills.value = payload.skills
      } else {
        skills.value = Array.isArray(data.skills) ? data.skills : []
      }

      return data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchProjects() {
    loading.value = true
    error.value = null
    try {
      const data = await studentService.fetchProjects()
      projects.value = Array.isArray(data) ? data : data.projects || []
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function addProject(payload) {
    const data = await studentService.createProject(payload)
    projects.value.push(data)
    return data
  }

  async function updateProject(projectId, payload) {
    const data = await studentService.updateProject(projectId, payload)
    const idx = projects.value.findIndex((p) => p.id === projectId)
    if (idx !== -1) projects.value[idx] = data
    return data
  }

  async function removeProject(projectId) {
    await studentService.deleteProject(projectId)
    projects.value = projects.value.filter((p) => p.id !== projectId)
  }

  async function setVisibility(isPublic) {
    await studentService.setVisibility(isPublic)
    visibility.value = isPublic
    if (profile.value) profile.value.isPublic = isPublic
  }

  async function uploadProjectFile(projectId, file) {
    if (!file) return
    const data = await studentService.uploadProjectFile(projectId, file)
    const idx = projects.value.findIndex((p) => p.id === projectId)
    if (idx !== -1) projects.value[idx] = data
    return data
  }

  function $reset() {
    profile.value = null
    projects.value = []
    skills.value = []
    visibility.value = true
    loading.value = false
    error.value = null
  }

  return {
    profile,
    projects,
    skills,
    visibility,
    loading,
    error,
    fetchProfile,
    updateProfile,
    fetchProjects,
    addProject,
    updateProject,
    removeProject,
    setVisibility,
    uploadProjectFile,
    $reset,
  }
})
