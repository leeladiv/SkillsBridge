<script setup>
import { computed, onMounted, ref } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import { useAdminStore } from '../stores/adminStore'
import { useToast } from '../composables/useToast'

const adminStore = useAdminStore()
const toast = useToast()
const loading = ref(true)

onMounted(async () => {
  try {
    await adminStore.fetchAnalytics()
  } catch {
    toast.error('Failed to load analytics')
  } finally {
    loading.value = false
  }
})

const topSkills = computed(() => adminStore.analytics?.topSkills || [])

function download(filename, text, mime = 'text/plain') {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function toCsvRow(values) {
  return values
    .map((v) => {
      const s = String(v ?? '')
      const escaped = s.replaceAll('"', '""')
      return `"${escaped}"`
    })
    .join(',')
}

function exportAnalyticsCsv() {
  const a = adminStore.analytics || {}
  const lines = []
  lines.push(toCsvRow(['Metric', 'Value']))
  lines.push(toCsvRow(['Total students', a.totalStudents ?? 0]))
  lines.push(toCsvRow(['Public profiles', a.totalPublicProfiles ?? 0]))
  lines.push(toCsvRow(['Universities', a.totalUniversities ?? 0]))
  lines.push('')
  lines.push(toCsvRow(['Top skills', 'Count']))
  for (const s of topSkills.value) {
    lines.push(toCsvRow([s.name, s.count]))
  }
  download(`skillsbridge-analytics-${new Date().toISOString().slice(0, 10)}.csv`, lines.join('\n'), 'text/csv')
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <header>
        <h1 class="text-2xl font-bold text-slate-900">Reports &amp; Analytics</h1>
        <p class="mt-1 text-sm text-slate-600">Platform growth and skill trends.</p>
      </header>

      <div v-if="loading" class="flex justify-center py-12">
        <BaseSpinner size="lg" />
      </div>

      <template v-else>
        <div class="grid gap-4 lg:grid-cols-3">
          <BaseCard padding="lg">
            <p class="text-sm font-semibold text-slate-600">Total students</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ adminStore.analytics?.totalStudents ?? 0 }}</p>
          </BaseCard>
          <BaseCard padding="lg">
            <p class="text-sm font-semibold text-slate-600">Public profiles</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ adminStore.analytics?.totalPublicProfiles ?? 0 }}</p>
          </BaseCard>
          <BaseCard padding="lg">
            <p class="text-sm font-semibold text-slate-600">Universities</p>
            <p class="mt-2 text-3xl font-bold text-slate-900">{{ adminStore.analytics?.totalUniversities ?? 0 }}</p>
          </BaseCard>
        </div>

        <BaseCard padding="lg">
          <div class="flex items-end justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">Top skills</h2>
              <p class="mt-1 text-sm text-slate-600">Most common skills across student profiles.</p>
            </div>
            <BaseButton size="sm" variant="secondary" @click="exportAnalyticsCsv">
              Export CSV
            </BaseButton>
          </div>

          <div v-if="!topSkills.length" class="mt-6 text-sm text-slate-600">
            No skill data yet.
          </div>

          <div v-else class="mt-6 grid gap-3 md:grid-cols-2">
            <div
              v-for="s in topSkills"
              :key="s.name"
              class="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div class="flex items-center justify-between gap-4">
                <p class="min-w-0 truncate text-sm font-semibold text-slate-900">{{ s.name }}</p>
                <p class="text-sm font-bold text-slate-900">{{ s.count }}</p>
              </div>
              <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  class="h-full rounded-full bg-blue-600"
                  :style="{ width: `${Math.min(100, (s.count / (topSkills[0]?.count || 1)) * 100)}%` }"
                />
              </div>
            </div>
          </div>
        </BaseCard>
      </template>
    </div>
  </AdminLayout>
</template>

