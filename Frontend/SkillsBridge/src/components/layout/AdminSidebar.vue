<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navItems = [
  { name: 'Overview', path: '/admin' },
  { name: 'Universities', path: '/admin/universities' },
]

function go(path) {
  router.push(path)
}

function isActive(path) {
  return router.currentRoute.value.path === path
}
</script>

<template>
  <aside class="flex w-56 flex-col border-r border-slate-200 bg-slate-50/50">
    <div class="flex flex-1 flex-col gap-1 p-4">
      <button
        v-for="item in navItems"
        :key="item.path"
        type="button"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors"
        :class="isActive(item.path) ? 'bg-primary-100 text-primary-800' : 'text-slate-700 hover:bg-slate-100'"
        @click="go(item.path)"
      >
        {{ item.name }}
      </button>
    </div>
  </aside>
</template>
