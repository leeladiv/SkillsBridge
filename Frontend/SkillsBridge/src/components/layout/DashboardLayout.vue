<script setup>
import LandingView from '@/views/LandingView.vue';
import DashboardSidebar from './DashboardSidebar.vue'

</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <LandingView />
  <div class="flex">

    <!-- Sidebar -->
    <DashboardSidebar />

    <!-- Main Content -->
    <main class="flex-1 bg-gray-100 min-h-screen p-6">
      <slot />
    </main>

  </div>
  </div>
</template>

