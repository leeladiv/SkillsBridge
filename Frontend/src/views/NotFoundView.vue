<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '../components/base/BaseButton.vue'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
    <h1 class="text-2xl font-bold text-slate-900">Page not found</h1>
    <p class="mt-2 text-slate-600">The page you're looking for doesn't exist.</p>
    <BaseButton class="mt-6" @click="router.push({ name: 'Home' })">Go home</BaseButton>
  </div>
</template>
