<script setup>
import AdminSidebar from './AdminSidebar.vue'
import { computed } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const displayName = computed(() => authStore.user?.fullName || authStore.user?.email || 'Admin User')
const roleLabel = computed(() => (authStore.isAdmin ? 'Super Admin' : 'Admin'))

async function logout() {
  await authStore.logout()
  router.push({ name: 'AdminLogin' })
}
</script>

<template>
  <div class="min-h-screen bg-[#e9eefc]">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200/60">
        <div class="flex min-h-[80vh]">
          <AdminSidebar @logout="logout" />

          <div class="flex min-w-0 flex-1 flex-col">
            <!-- Top bar -->
            <header class="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
              <div class="min-w-0 flex-1">
                <div class="relative max-w-xl">
                  <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="search"
                    placeholder="Search anything..."
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
              </div>

              <div class="flex items-center gap-4">
                <button
                  type="button"
                  class="relative rounded-xl p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  aria-label="Notifications"
                >
                  <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                  <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 01-6 0"
                    />
                  </svg>
                </button>

                <div class="flex items-center gap-3">
                  <div class="text-right leading-tight">
                    <p class="text-sm font-semibold text-slate-900">{{ displayName }}</p>
                    <p class="text-xs text-slate-500">{{ roleLabel }}</p>
                  </div>
                  <div class="h-10 w-10 overflow-hidden rounded-full bg-slate-200 ring-2 ring-white">
                    <div class="flex h-full w-full items-center justify-center text-sm font-bold text-slate-600">
                      {{ String(displayName || 'A').trim()[0]?.toUpperCase() }}
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <!-- Page body -->
            <main class="min-w-0 flex-1 bg-slate-50 px-6 py-6">
              <slot />
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
