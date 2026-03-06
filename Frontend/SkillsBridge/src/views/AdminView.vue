<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '../components/layout/AdminLayout.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import { useAdminStore } from '../stores/adminStore'
import { useToast } from '../composables/useToast'

const router = useRouter()
const adminStore = useAdminStore()
const toast = useToast()
const loading = ref(true)

onMounted(async () => {
  try {
    await Promise.all([
      adminStore.fetchUniversityRequests(),
      adminStore.fetchStudents(),
      adminStore.fetchAnalytics(),
    ])
  } catch {
    toast.error('Failed to load admin data')
  }
  loading.value = false
})

async function handleApprove(requestId) {
  try {
    await adminStore.approveUniversity(requestId)
    toast.success('University approved and added')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to approve')
  }
}

async function handleReject(requestId) {
  try {
    await adminStore.rejectUniversity(requestId)
    toast.success('Request rejected')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to reject')
  }
}

async function handleSuspend(userId) {
  try {
    await adminStore.suspendUser(userId, 'Moderation')
    toast.success('User suspended')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to suspend user')
  }
}

async function handleUnsuspend(userId) {
  try {
    await adminStore.unsuspendUser(userId)
    toast.success('User unsuspended')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to unsuspend user')
  }
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-8">
      <h1 class="text-2xl font-bold text-slate-900">Admin overview</h1>

      <div v-if="loading" class="flex justify-center py-12">
        <BaseSpinner size="lg" />
      </div>

      <template v-else>
        <BaseCard padding="lg">
          <h2 class="text-lg font-semibold text-slate-900">Analytics</h2>
          <p class="mt-1 text-sm text-slate-600">Key metrics across students and universities.</p>
          <div v-if="adminStore.analytics" class="mt-6 grid gap-4 sm:grid-cols-3">
            <div class="rounded-lg bg-slate-50 px-4 py-3">
              <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Total students</p>
              <p class="mt-1 text-2xl font-semibold text-slate-900">
                {{ adminStore.analytics.totalStudents }}
              </p>
            </div>
            <div class="rounded-lg bg-slate-50 px-4 py-3">
              <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Public profiles</p>
              <p class="mt-1 text-2xl font-semibold text-slate-900">
                {{ adminStore.analytics.totalPublicProfiles }}
              </p>
            </div>
            <div class="rounded-lg bg-slate-50 px-4 py-3">
              <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Universities</p>
              <p class="mt-1 text-2xl font-semibold text-slate-900">
                {{ adminStore.analytics.totalUniversities }}
              </p>
            </div>
          </div>
          <div v-if="adminStore.analytics?.topSkills?.length" class="mt-6">
            <h3 class="text-sm font-semibold text-slate-800">Top skills</h3>
            <ul class="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <li
                v-for="skill in adminStore.analytics.topSkills"
                :key="skill.name"
                class="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm"
              >
                <span class="text-slate-700">{{ skill.name }}</span>
                <span class="text-slate-500">{{ skill.count }}</span>
              </li>
            </ul>
          </div>
        </BaseCard>

        <BaseCard padding="lg">
          <h2 class="text-lg font-semibold text-slate-900">University requests</h2>
          <p class="mt-1 text-sm text-slate-600">Pending requests to add new universities.</p>
          <div v-if="adminStore.requests.length" class="mt-4 space-y-2">
            <div
              v-for="r in adminStore.requests"
              :key="r.id"
              class="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
            >
              <div>
                <span class="font-medium">{{ r.requestedName || r.universityName }}</span>
                <span v-if="r.requesterEmail" class="ml-2 text-sm text-slate-500">{{ r.requesterEmail }}</span>
              </div>
              <div class="flex gap-2">
                <BaseButton size="sm" @click="handleApprove(r.id)">Approve</BaseButton>
                <BaseButton variant="danger" size="sm" @click="handleReject(r.id)">Reject</BaseButton>
              </div>
            </div>
          </div>
          <p v-else class="mt-4 text-sm text-slate-500">No pending requests.</p>
          <BaseButton class="mt-4" size="sm" @click="router.push({ name: 'AdminUniversities' })">
            Manage universities
          </BaseButton>
        </BaseCard>

        <BaseCard padding="lg">
          <h2 class="text-lg font-semibold text-slate-900">Students</h2>
          <p class="mt-1 text-sm text-slate-600">Registered students (content moderation).</p>
          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr v-for="s in adminStore.students" :key="s.id">
                  <td class="px-4 py-2 text-sm text-slate-900">{{ s.fullName }}</td>
                  <td class="px-4 py-2 text-sm text-slate-600">{{ s.email }}</td>
                  <td class="px-4 py-2">
                    <BaseButton
                      v-if="!s.suspended && !s.isSuspended"
                      variant="danger"
                      size="sm"
                      @click="handleSuspend(s.id)"
                    >
                      Suspend
                    </BaseButton>
                    <BaseButton
                      v-else
                      variant="secondary"
                      size="sm"
                      @click="handleUnsuspend(s.id)"
                    >
                      Unsuspend
                    </BaseButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </template>
    </div>
  </AdminLayout>
</template>
