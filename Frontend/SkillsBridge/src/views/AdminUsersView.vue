<script setup>
import { computed, onMounted, ref } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import { useAdminStore } from '../stores/adminStore'
import { useToast } from '../composables/useToast'

const adminStore = useAdminStore()
const toast = useToast()
const loading = ref(true)
const query = ref('')

onMounted(async () => {
  try {
    await adminStore.fetchStudents()
  } catch {
    toast.error('Failed to load users')
  } finally {
    loading.value = false
  }
})

const filtered = computed(() => {
  const q = String(query.value || '').trim().toLowerCase()
  const items = adminStore.students || []
  if (!q) return items
  return items.filter((u) => {
    return (
      String(u.fullName || '').toLowerCase().includes(q) ||
      String(u.email || '').toLowerCase().includes(q) ||
      String(u.university || '').toLowerCase().includes(q)
    )
  })
})

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

function exportUsersCsv() {
  const items = filtered.value || []
  const lines = []
  lines.push(toCsvRow(['Full name', 'Email', 'University', 'Status']))
  for (const u of items) {
    lines.push(
      toCsvRow([
        u.fullName,
        u.email,
        u.university || '',
        u.isSuspended ? 'Suspended' : 'Active',
      ])
    )
  }
  download(`skillsbridge-users-${new Date().toISOString().slice(0, 10)}.csv`, lines.join('\n'), 'text/csv')
}

async function suspend(u) {
  try {
    await adminStore.suspendUser(u.id, 'Moderation')
    toast.success('User suspended')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to suspend')
  }
}

async function unsuspend(u) {
  try {
    await adminStore.unsuspendUser(u.id)
    toast.success('User unsuspended')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to unsuspend')
  }
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <header class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Users</h1>
          <p class="mt-1 text-sm text-slate-600">Manage student accounts and moderation actions.</p>
        </div>
        <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <div class="w-full sm:w-80">
            <BaseInput v-model="query" name="q" placeholder="Search name, email, university..." />
          </div>
          <BaseButton size="sm" variant="secondary" @click="exportUsersCsv">
            Export CSV
          </BaseButton>
        </div>
      </header>

      <div v-if="loading" class="flex justify-center py-12">
        <BaseSpinner size="lg" />
      </div>

      <BaseCard v-else padding="lg">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead>
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Student
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  University
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="u in filtered" :key="u.id" class="bg-white">
                <td class="px-4 py-3">
                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold text-slate-900">{{ u.fullName }}</p>
                    <p class="truncate text-xs text-slate-600">{{ u.email }}</p>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-slate-700">
                  {{ u.university || '—' }}
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-flex rounded-full px-2 py-0.5 text-xs font-semibold"
                    :class="u.isSuspended ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'"
                  >
                    {{ u.isSuspended ? 'Suspended' : 'Active' }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <BaseButton
                    v-if="!u.isSuspended"
                    size="sm"
                    variant="danger"
                    @click="suspend(u)"
                  >
                    Suspend
                  </BaseButton>
                  <BaseButton v-else size="sm" variant="secondary" @click="unsuspend(u)">
                    Unsuspend
                  </BaseButton>
                </td>
              </tr>
              <tr v-if="!filtered.length">
                <td colspan="4" class="px-4 py-10 text-center text-sm text-slate-600">
                  No users match your search.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseCard>
    </div>
  </AdminLayout>
</template>

