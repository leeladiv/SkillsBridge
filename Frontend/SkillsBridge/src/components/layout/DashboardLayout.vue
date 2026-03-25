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

const avatarInitial = computed(() => {
  const raw = user.value?.fullName || user.value?.email || 'U'
  return String(raw?.[0] || 'U').toUpperCase()
})

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-5 w-5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8v10H3V8" />
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            aria-label="Notifications"
            @click="router.push({ name: 'Messages' })"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-5 w-5"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V4a1 1 0 0 0-2 0v1.341C10.01 6.165 8 8.388 8 11v3.159c0 .538-.214 1.055-.595 1.436L6 17h9z"
              />
            </svg>
          </button>
          <div class="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
            <span
              v-if="user?.image"
              class="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-indigo-600"
            >
              <img :src="user.image" alt="Profile photo" class="h-full w-full object-cover" />
            </span>
            <span
              v-else
              class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
            >
              {{ avatarInitial }}
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

