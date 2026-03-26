<script setup>
import { computed } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseButton from '../components/base/BaseButton.vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const adminEmail = computed(() => authStore.user?.email || '—')
const adminName = computed(() => authStore.user?.fullName || 'Admin')

async function logout() {
  await authStore.logout()
  router.push({ name: 'AdminLogin' })
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <header>
        <h1 class="text-2xl font-bold text-slate-900">Settings</h1>
        <p class="mt-1 text-sm text-slate-600">Admin account and basic system settings.</p>
      </header>

      <div class="grid gap-4 lg:grid-cols-2">
        <BaseCard padding="lg">
          <h2 class="text-lg font-semibold text-slate-900">Admin account</h2>
          <div class="mt-4 space-y-2 text-sm">
            <p><span class="font-semibold text-slate-700">Name:</span> {{ adminName }}</p>
            <p><span class="font-semibold text-slate-700">Email:</span> {{ adminEmail }}</p>
            <p><span class="font-semibold text-slate-700">Role:</span> {{ authStore.role || 'admin' }}</p>
          </div>
          <div class="mt-6 flex gap-2">
            <BaseButton variant="secondary" @click="logout">Log out</BaseButton>
          </div>
        </BaseCard>

        <BaseCard padding="lg">
          <h2 class="text-lg font-semibold text-slate-900">System</h2>
          <p class="mt-1 text-sm text-slate-600">
            Basic environment info (placeholder for future settings like rate limits, email config, etc.).
          </p>
          <div class="mt-4 space-y-2 text-sm text-slate-700">
            <p><span class="font-semibold">API base:</span> /api</p>
            <p><span class="font-semibold">Auth:</span> JWT</p>
            <p><span class="font-semibold">Database:</span> SQLite</p>
          </div>
        </BaseCard>
      </div>
    </div>
  </AdminLayout>
</template>

