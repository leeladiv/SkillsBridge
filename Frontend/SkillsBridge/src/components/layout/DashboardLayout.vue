<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardSidebar from './DashboardSidebar.vue'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)
const themeStore = useThemeStore()

function goHome() {
  router.push({ name: 'Home' })
}

onMounted(() => {
  themeStore.hydrate()
})
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header class="flex h-16 items-center justify-between">
        <button type="button" class="flex items-center gap-2" @click="goHome">
          <img src="/public/SkillsBridge Logo1.png" alt="SkillsBridge" class="h-9 w-9 rounded-lg" />
          <span class="text-sm font-semibold text-slate-900">SkillsBridge</span>
        </button>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            aria-label="Messages"
            @click="router.push({ name: 'Messages' })"
          >
            ✉
          </button>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            aria-label="Notifications"
          >
            🔔
          </button>
          <div class="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
            <span class="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
              {{ (user?.fullName || user?.email || 'U')[0] }}
            </span>
            <span class="hidden text-sm font-semibold text-slate-900 sm:inline">
              {{ user?.fullName || user?.email }}
            </span>
          </div>
        </div>
      </header>

      <!-- Simple back/home helper for students -->
      <div class="mb-3 flex items-center text-xs text-slate-500">
        <button
          type="button"
          class="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-slate-100 hover:text-slate-700"
          @click="goHome"
        >
          <span class="text-sm">←</span>
          <span>Back to home</span>
        </button>
      </div>

      <div class="flex flex-col sm:flex-row gap-6 pb-10">
        <DashboardSidebar />
        <main class="min-w-0 flex-1 pt-2">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

