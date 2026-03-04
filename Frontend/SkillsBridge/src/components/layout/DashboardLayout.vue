<script setup>
import AppNavbar from './AppNavbar.vue'
import DashboardSidebar from './DashboardSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <AppNavbar />
    <div class="flex">
      <DashboardSidebar />
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
