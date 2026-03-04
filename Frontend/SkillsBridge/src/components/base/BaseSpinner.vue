<script setup>
defineProps({
  size: { type: String, default: 'md' }, // sm | md | lg
})
</script>

<template>
  <div
    class="animate-spin rounded-full border-2 border-current border-t-transparent text-primary-600"
    :class="[
      size === 'sm' && 'h-5 w-5',
      size === 'md' && 'h-8 w-8',
      size === 'lg' && 'h-12 w-12',
    ]"
    role="status"
    aria-label="Loading"
  />
</template>
