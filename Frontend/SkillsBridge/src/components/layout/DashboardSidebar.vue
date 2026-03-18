<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const current = computed(() => router.currentRoute.value)

const navItems = [
  { name: 'Dashboard', to: { name: 'Dashboard' }, icon: '▦' },
  { name: 'Projects', to: { name: 'Projects' }, icon: '▤' },
  { name: 'Messages', to: { name: 'Messages' }, icon: '✉' },
  { name: 'Settings', to: { name: 'Settings' }, icon: '⚙' },
  { name: 'Preview', to: { name: 'Preview' }, icon: '👁' },
]

function go(to) {
  router.push(to)
}

function isActive(item) {
  return item.to?.name === current.value.name
}
</script>

<template>
  <aside class="flex w-64 flex-col">
    <div class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <button
        type="button"
        class="flex w-full items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-3 text-left shadow-sm ring-1 ring-slate-200 hover:bg-slate-100"
        @click="router.push({ name: 'Dashboard', query: { newProject: '1' } })">
        <span class="text-sm font-semibold text-slate-800">Create new project</span>
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
          +
        </span>
      </button>
      </div>

      <div class="mt-4 flex flex-col gap-1">
      <button
        v-for="item in navItems"
        :key="item.name"
        type="button"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors"
        :class="isActive(item) ? 'bg-indigo-50 text-indigo-800' : 'text-slate-700 hover:bg-slate-50'"
        @click="go(item.to)"
      >
        <span class="text-base">{{ item.icon }}</span>
        {{ item.name }}
      </button>
    </div>
  </aside>
</template>

<script setup>
function logout() {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
</script>