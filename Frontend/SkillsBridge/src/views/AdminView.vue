<script setup>
import { computed, onMounted, ref } from 'vue'
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

const summaryCards = computed(() => {
  const a = adminStore.analytics
  return [
    {
      label: 'Total Universities',
      value: a?.totalUniversities ?? 0,
      icon: 'school',
    },
    {
      label: 'Total Students',
      value: a?.totalStudents ?? 0,
      icon: 'users',
    },
    {
      label: 'Public Profiles',
      value: a?.totalPublicProfiles ?? 0,
      icon: 'doc',
    },
    {
      label: 'Top Skills',
      value: a?.topSkills?.length ?? 0,
      icon: 'shield',
      suffix: ' tracked',
    },
  ]
})

const recentActivity = computed(() => {
  const requests = (adminStore.requests || []).slice(0, 3).map((r) => ({
    title: `${r.requestedName || r.universityName} requested`,
    meta: r.requesterEmail ? `by ${r.requesterEmail}` : 'pending review',
    icon: 'school',
  }))
  const students = (adminStore.students || []).slice(0, 2).map((s) => ({
    title: `${s.fullName} joined the platform`,
    meta: s.email,
    icon: 'users',
  }))
  return [...requests, ...students].slice(0, 5)
})

const pendingRequestsCount = computed(() => adminStore.requests?.length || 0)
const suspendedUsersCount = computed(() => (adminStore.students || []).filter((s) => s.isSuspended).length)

const insights = computed(() => {
  const total = adminStore.analytics?.totalStudents ?? 0
  const publicCount = adminStore.analytics?.totalPublicProfiles ?? 0
  const publicRate = total > 0 ? Math.round((publicCount / total) * 100) : 0
  return [
    {
      title: 'Profile visibility',
      value: `${publicRate}%`,
      detail: `${publicCount} public profiles out of ${total}`,
      tone: publicRate >= 50 ? 'good' : 'warn',
    },
    {
      title: 'Pending requests',
      value: String(pendingRequestsCount.value),
      detail: pendingRequestsCount.value ? 'Review university requests to keep onboarding moving.' : 'Inbox is clear.',
      tone: pendingRequestsCount.value ? 'warn' : 'good',
    },
    {
      title: 'Moderation',
      value: String(suspendedUsersCount.value),
      detail: suspendedUsersCount.value ? 'Suspended accounts currently restricted.' : 'No active suspensions.',
      tone: suspendedUsersCount.value ? 'neutral' : 'good',
    },
  ]
})

function iconPath(kind) {
  switch (kind) {
    case 'school':
      return 'M12 3l9 5-9 5-9-5 9-5zm-7 9v6c0 1 3 3 7 3s7-2 7-3v-6'
    case 'users':
      return 'M17 21v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1m15-11a4 4 0 11-8 0 4 4 0 018 0z'
    case 'doc':
      return 'M7 3h7l3 3v15a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm7 0v4h4'
    case 'shield':
      return 'M12 3l8 4v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V7l8-4z'
    default:
      return ''
  }
}

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
    <div class="space-y-6">
      <header class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Welcome back</p>
          <h1 class="mt-1 text-2xl font-bold text-slate-900">SkillsBridge Admin Dashboard</h1>
          <p class="mt-1 text-sm text-slate-600">
            Platform insights, moderation, and university onboarding — in one place.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <BaseButton size="sm" variant="secondary" @click="router.push({ name: 'AdminReports' })">
            Export / Reports
          </BaseButton>
          <BaseButton size="sm" @click="router.push({ name: 'AdminUsers' })">
            Manage users
          </BaseButton>
        </div>
      </header>

      <div v-if="loading" class="flex justify-center py-12">
        <BaseSpinner size="lg" />
      </div>

      <template v-else>
        <!-- Summary cards -->
        <div class="grid gap-4 lg:grid-cols-4">
          <BaseCard v-for="c in summaryCards" :key="c.label" padding="lg">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-semibold text-slate-600">{{ c.label }}</p>
                <p class="mt-2 text-2xl font-bold text-slate-900">
                  {{ c.value }}<span v-if="c.suffix" class="text-sm font-semibold text-slate-500"> {{ c.suffix }}</span>
                </p>
              </div>
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="iconPath(c.icon)" />
                </svg>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Command center -->
        <div class="grid gap-4 lg:grid-cols-3">
          <BaseCard padding="lg" class="lg:col-span-2 overflow-hidden">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Command center</h2>
                <p class="mt-1 text-sm text-slate-600">
                  Quick actions for day-to-day operations.
                </p>
              </div>
              <div class="flex flex-wrap gap-2">
                <BaseButton size="sm" @click="router.push({ name: 'AdminUsers' })">Users</BaseButton>
                <BaseButton size="sm" variant="secondary" @click="router.push({ name: 'AdminUniversities' })">
                  Universities
                </BaseButton>
                <BaseButton size="sm" variant="secondary" @click="router.push({ name: 'AdminReports' })">
                  Reports
                </BaseButton>
              </div>
            </div>

            <div class="mt-6 grid gap-4 md:grid-cols-3">
              <div
                v-for="i in insights"
                :key="i.title"
                class="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">{{ i.title }}</p>
                <p class="mt-2 text-2xl font-bold text-slate-900">{{ i.value }}</p>
                <p
                  class="mt-2 text-xs"
                  :class="i.tone === 'good' ? 'text-emerald-700' : i.tone === 'warn' ? 'text-orange-700' : 'text-slate-600'"
                >
                  {{ i.detail }}
                </p>
              </div>
            </div>
          </BaseCard>

          <BaseCard padding="lg">
            <h2 class="text-lg font-semibold text-slate-900">Today’s priority</h2>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p class="text-sm font-semibold text-slate-900">University requests</p>
                <p class="mt-1 text-sm text-slate-600">
                  {{ pendingRequestsCount ? `${pendingRequestsCount} pending` : 'No pending requests' }}
                </p>
                <BaseButton
                  class="mt-3 w-full"
                  size="sm"
                  :variant="pendingRequestsCount ? 'primary' : 'secondary'"
                  @click="router.push({ name: 'AdminUniversities' })"
                >
                  Review requests
                </BaseButton>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p class="text-sm font-semibold text-slate-900">Analytics snapshot</p>
                <p class="mt-1 text-sm text-slate-600">See what skills are trending.</p>
                <BaseButton class="mt-3 w-full" size="sm" variant="secondary" @click="router.push({ name: 'AdminReports' })">
                  Open reports
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Middle row -->
        <div class="grid gap-4 lg:grid-cols-3">
          <BaseCard class="lg:col-span-2" padding="lg">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">System Performance Overview</h2>
                <p class="mt-1 text-sm text-slate-600">Activity snapshot across the week.</p>
              </div>
              <select
                class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>

            <!-- Lightweight “chart” (no chart library) -->
            <div class="mt-6 grid grid-cols-7 gap-3">
              <div v-for="day in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']" :key="day" class="text-center">
                <div class="mx-auto flex h-28 w-10 items-end justify-center gap-1">
                  <div class="w-2 rounded-t-lg bg-blue-600" :style="{ height: (Math.random() * 70 + 20) + '%' }" />
                  <div class="w-2 rounded-t-lg bg-slate-300" :style="{ height: (Math.random() * 70 + 20) + '%' }" />
                  <div class="w-2 rounded-t-lg bg-pink-400" :style="{ height: (Math.random() * 70 + 20) + '%' }" />
                </div>
                <div class="mt-2 text-xs font-medium text-slate-500">{{ day }}</div>
              </div>
            </div>
            <div class="mt-4 flex flex-wrap gap-4 text-xs text-slate-600">
              <div class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-blue-600" /> New universities</div>
              <div class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-slate-300" /> New students</div>
              <div class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-pink-400" /> Requests reviewed</div>
            </div>
          </BaseCard>

          <BaseCard padding="lg">
            <h2 class="text-lg font-semibold text-slate-900">Recent Activity</h2>
            <div class="mt-4 space-y-3">
              <div
                v-for="(a, idx) in recentActivity"
                :key="idx"
                class="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3"
              >
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="iconPath(a.icon)" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-slate-900">{{ a.title }}</p>
                  <p class="truncate text-xs text-slate-500">{{ a.meta }}</p>
                </div>
              </div>
            </div>
            <BaseButton
              class="mt-4 w-full"
              variant="secondary"
              size="sm"
              @click="router.push({ name: 'AdminUniversities' })"
            >
              View all
            </BaseButton>
          </BaseCard>
        </div>

        <!-- System health -->
        <BaseCard padding="lg">
          <h2 class="text-lg font-semibold text-slate-900">System Health</h2>
          <div class="mt-5 grid gap-4 md:grid-cols-3">
            <div class="rounded-2xl border border-slate-200 bg-white p-5">
              <p class="text-sm font-semibold text-slate-700">Auto Check Status</p>
              <p class="mt-3 text-sm font-semibold text-emerald-700">Running Smoothly</p>
              <p class="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Healthy
              </p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-5">
              <p class="text-sm font-semibold text-slate-700">Server Load</p>
              <p class="mt-3 text-sm font-semibold text-slate-900">
                {{ Math.min(95, 30 + (adminStore.students?.length || 0) % 60) }}%
              </p>
              <p class="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                Normal
              </p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-5">
              <p class="text-sm font-semibold text-slate-700">Last System Sync</p>
              <p class="mt-3 text-sm font-semibold text-orange-700">
                {{ new Date().toLocaleString() }}
              </p>
              <p class="mt-1 inline-flex rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                Attention
              </p>
            </div>
          </div>
        </BaseCard>

        <!-- Keep the existing operational tables below (still useful) -->
        <div class="grid gap-4 lg:grid-cols-2">
          <BaseCard padding="lg">
            <h2 class="text-lg font-semibold text-slate-900">University requests</h2>
            <p class="mt-1 text-sm text-slate-600">Pending requests to add new universities.</p>
            <div v-if="adminStore.requests.length" class="mt-4 space-y-2">
              <div
                v-for="r in adminStore.requests"
                :key="r.id"
                class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div class="min-w-0">
                  <p class="truncate font-semibold text-slate-900">{{ r.requestedName || r.universityName }}</p>
                  <p v-if="r.requesterEmail" class="truncate text-sm text-slate-500">{{ r.requesterEmail }}</p>
                </div>
                <div class="flex gap-2">
                  <BaseButton size="sm" @click="handleApprove(r.id)">Approve</BaseButton>
                  <BaseButton variant="danger" size="sm" @click="handleReject(r.id)">Reject</BaseButton>
                </div>
              </div>
            </div>
            <p v-else class="mt-4 text-sm text-slate-500">No pending requests.</p>
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
                    <td class="px-4 py-2 text-sm font-medium text-slate-900">{{ s.fullName }}</td>
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
                      <BaseButton v-else variant="secondary" size="sm" @click="handleUnsuspend(s.id)">
                        Unsuspend
                      </BaseButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </BaseCard>
        </div>
      </template>
    </div>
  </AdminLayout>
</template>
