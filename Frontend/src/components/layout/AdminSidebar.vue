<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineEmits(['logout'])

const navItems = [
  { name: 'Dashboard', path: '/admin', enabled: true, icon: 'grid' },
  { name: 'Users', path: '/admin/users', enabled: true, icon: 'users' },
  { name: 'Universities', path: '/admin/universities', enabled: true, icon: 'school' },
  { name: 'Reports & Analytics', path: '/admin/reports', enabled: true, icon: 'chart' },
  { name: 'Settings', path: '/admin/settings', enabled: true, icon: 'gear' },
]

const grouped = computed(() => ({
  overview: navItems,
 }))

function go(path) {
  router.push(path)
}

function isActive(path) {
  return router.currentRoute.value.path === path
}

function iconPath(kind) {
  switch (kind) {
    case 'grid':
      return 'M4 5h7v7H4V5zm9 0h7v7h-7V5zM4 14h7v7H4v-7zm9 0h7v7h-7v-7z'
    case 'school':
      return 'M12 3l9 5-9 5-9-5 9-5zm-7 9v6c0 1 3 3 7 3s7-2 7-3v-6'
    case 'building':
      return 'M3 21V5a2 2 0 012-2h8a2 2 0 012 2v16M7 7h1M7 11h1M7 15h1M11 7h1M11 11h1M11 15h1M15 11h1M15 15h1M19 21V11a2 2 0 00-2-2h-2'
    case 'users':
      return 'M17 21v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1m15-11a4 4 0 11-8 0 4 4 0 018 0z'
    case 'chart':
      return 'M4 19V5m0 14h16M8 17v-6m4 6V7m4 10v-4m4 4V9'
    case 'gear':
      return 'M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm8-3.5l-1.6-.6a6.7 6.7 0 00-.6-1.5l.8-1.5-1.7-1.7-1.5.8a6.7 6.7 0 00-1.5-.6L12 4 10.4 5.6a6.7 6.7 0 00-1.5.6l-1.5-.8L5.7 7.1l.8 1.5a6.7 6.7 0 00-.6 1.5L4.3 12l1.6.6a6.7 6.7 0 00.6 1.5l-.8 1.5 1.7 1.7 1.5-.8a6.7 6.7 0 001.5.6L12 20l1.6-1.6a6.7 6.7 0 001.5-.6l1.5.8 1.7-1.7-.8-1.5a6.7 6.7 0 00.6-1.5L20 12z'
    default:
      return ''
  }
}
</script>

<template>
  <aside class="flex w-72 flex-col bg-white">
    <div class="border-r border-slate-200 p-6 pb-4">
      <p class="text-sm font-semibold text-slate-900">Admin</p>
      <p class="text-xs text-slate-500">Super Dashboard</p>
    </div>

    <div class="flex flex-1 flex-col border-r border-slate-200 px-4 pb-4">
      <p class="px-3 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Overview</p>

      <nav class="mt-2 flex flex-col gap-1">
        <button
          v-for="item in grouped.overview"
          :key="item.name"
          type="button"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition"
          :class="[
            item.enabled
              ? isActive(item.path)
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
              : 'cursor-not-allowed text-slate-400',
          ]"
          :disabled="!item.enabled"
          @click="item.enabled ? go(item.path) : null"
        >
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg"
            :class="isActive(item.path) && item.enabled ? 'bg-white/15' : 'bg-slate-100'"
          >
            <svg
              viewBox="0 0 24 24"
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path :d="iconPath(item.icon)" />
            </svg>
          </span>
          <span class="min-w-0 flex-1 truncate">{{ item.name }}</span>
          <span v-if="!item.enabled" class="text-xs font-medium">Soon</span>
        </button>
      </nav>

      <div class="mt-auto pt-6">
        <button
          type="button"
          class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
          @click="$emit('logout')"
        >
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 17l1 1 6-6-6-6-1 1m7 5H3" />
            </svg>
          </span>
          Logout
        </button>
      </div>
    </div>
  </aside>
</template>
