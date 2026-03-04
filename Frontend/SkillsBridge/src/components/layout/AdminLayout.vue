<script setup>
import AppNavbar from './AppNavbar.vue'
import AdminSidebar from './AdminSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <AppNavbar />
    <div class="flex">
      <AdminSidebar />
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
