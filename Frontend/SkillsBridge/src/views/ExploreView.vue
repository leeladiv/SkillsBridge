<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import AppNavbar from '../components/layout/AppNavbar.vue'
import StudentCard from '../components/explore/StudentCard.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseSelect from '../components/base/BaseSelect.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import BaseEmpty from '../components/base/BaseEmpty.vue'
import { useUniversityStore } from '../stores/universityStore'
import * as exploreService from '../services/exploreService'
import { useToast } from '../composables/useToast'

const universityStore = useUniversityStore()
const toast = useToast()
const loading = ref(true)
const searchSkill = ref('')
const selectedUniversityId = ref('')
const profiles = ref([])
const page = ref(1)
const totalPages = ref(1)
const perPage = 10

const universityOptions = computed(() => [
  { value: '', label: 'All universities' },
  ...universityStore.universities.map((u) => ({ value: u.id, label: u.name })),
])

async function loadProfiles() {
  loading.value = true
  try {
    const params = { page: page.value, limit: perPage }
    if (selectedUniversityId.value) params.university = selectedUniversityId.value
    if (searchSkill.value.trim()) params.skill = searchSkill.value.trim()
    const data = await exploreService.fetchPublicProfiles(params)
    if (data.students) {
      profiles.value = data.students
      totalPages.value = data.pagination?.totalPages || 1
    } else {
      profiles.value = Array.isArray(data) ? data : []
      totalPages.value = 1
    }
  } catch {
    toast.error('Failed to load profiles')
    profiles.value = []
  } finally {
    loading.value = false
  }
}

let searchTimer = null
watch(selectedUniversityId, () => {
  page.value = 1
  loadProfiles()
})
watch(searchSkill, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    loadProfiles()
  }, 400)
})

watch(page, () => {
  loadProfiles()
})

onMounted(async () => {
  await universityStore.fetchUniversities()
  await loadProfiles()
})

function getUniversityName(student) {
  if (student.university?.name) return student.university.name
  if (student.universityId) {
    const u = universityStore.universities.find((x) => x.id === student.universityId)
    return u?.name || ''
  }
  return ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppNavbar />
    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-slate-900">Explore students</h1>
      <p class="mt-1 text-slate-800">Browse public student portfolios by university and skills.</p>

      <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div class="flex-1 max-w-xs">
          <BaseInput
            v-model="searchSkill"
            placeholder="Search by skill..."
            name="skill"
          />
        </div>
        <div class="w-full sm:w-48">
          <BaseSelect
            v-model="selectedUniversityId"
            :options="universityOptions"
            placeholder="All universities"
            name="university"
          />
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-16">
        <BaseSpinner size="lg" />
      </div>
      <BaseEmpty
        v-else-if="!profiles.length"
        title="No profiles found"
        description="Try changing filters or search."
        class="mt-8"
      />
      <div v-else class="mt-8">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StudentCard
            v-for="student in profiles"
            :key="student.id"
            :student="student"
            :university-name="getUniversityName(student)"
          />
        </div>
        <div v-if="totalPages > 1" class="mt-6 flex justify-center gap-2">
          <button
            type="button"
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-50"
            :disabled="page <= 1"
            @click="page--"
          >
            Previous
          </button>
          <span class="flex items-center px-4 text-sm text-slate-600">Page {{ page }} of {{ totalPages }}</span>
          <button
            type="button"
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-50"
            :disabled="page >= totalPages"
            @click="page++"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
