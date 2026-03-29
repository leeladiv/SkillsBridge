import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as universityService from '../services/universityService'

export const useUniversityStore = defineStore('university', () => {
  const universities = ref([])
  const requests = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchUniversities() {
    loading.value = true
    error.value = null
    try {
      const data = await universityService.fetchUniversities()
      universities.value = Array.isArray(data) ? data : data.universities || []
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      universities.value = []
    } finally {
      loading.value = false
    }
  }

  async function requestUniversity(payload) {
    try {
      await universityService.requestUniversity(payload)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || err.message
      return { success: false, error: message }
    }
  }

  async function fetchUniversityRequests() {
    loading.value = true
    error.value = null
    try {
      const data = await universityService.fetchUniversityRequests()
      requests.value = Array.isArray(data) ? data : data.requests || []
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function approveUniversity(requestId) {
    await universityService.approveUniversity(requestId)
    requests.value = requests.value.filter((r) => r.id !== requestId)
    await fetchUniversities()
  }

  async function rejectUniversity(requestId) {
    await universityService.rejectUniversity(requestId)
    requests.value = requests.value.filter((r) => r.id !== requestId)
  }

  async function addUniversity(payload) {
    const data = await universityService.addUniversity(payload)
    universities.value.push(data)
    return data
  }

  return {
    universities,
    requests,
    loading,
    error,
    fetchUniversities,
    requestUniversity,
    fetchUniversityRequests,
    approveUniversity,
    rejectUniversity,
    addUniversity,
  }
})
