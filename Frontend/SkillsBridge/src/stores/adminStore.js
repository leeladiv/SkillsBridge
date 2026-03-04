import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as adminService from '../services/adminService'
import { useUniversityStore } from './universityStore'

export const useAdminStore = defineStore('admin', () => {
  const universityStore = useUniversityStore()
  const students = ref([])
  const loading = ref(false)
  const error = ref(null)
  const analytics = ref(null)

  async function fetchUniversityRequests() {
    try {
      const data = await adminService.fetchUniversityRequests()
      const items = Array.isArray(data) ? data : data.requests || data.universityRequests || []
      universityStore.requests.splice(0, universityStore.requests.length, ...items)
    } catch (err) {
      universityStore.error = err.response?.data?.message || err.message
      throw err
    }
  }

  async function approveUniversity(requestId) {
    return universityStore.approveUniversity(requestId)
  }

  async function rejectUniversity(requestId) {
    return universityStore.rejectUniversity(requestId)
  }

  async function addUniversity(payload) {
    return universityStore.addUniversity(payload)
  }

  async function fetchStudents(params = {}) {
    loading.value = true
    error.value = null
    try {
      const data = await adminService.fetchStudents(params)
      students.value = Array.isArray(data) ? data : data.students || []
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function suspendUser(userId, reason) {
    await adminService.suspendUser(userId, reason)
    const u = students.value.find((s) => s.id === userId)
    if (u) u.suspended = true
  }

  async function unsuspendUser(userId) {
    await adminService.unsuspendUser(userId)
    const u = students.value.find((s) => s.id === userId)
    if (u) u.suspended = false
  }

  async function fetchAnalytics() {
    loading.value = true
    error.value = null
    try {
      const data = await adminService.fetchAnalytics()
      analytics.value = data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    students,
    loading,
    error,
    analytics,
    fetchUniversityRequests,
    approveUniversity,
    rejectUniversity,
    addUniversity,
    fetchStudents,
    suspendUser,
    unsuspendUser,
    fetchAnalytics,
    get requests() {
      return universityStore.requests
    },
  }
})
