<script setup>
defineProps({
  variant: { type: String, default: 'info' }, // info | success | warning | error
  title: String,
  dismissible: Boolean,
})
defineEmits(['dismiss'])
</script>

<template>
  <div
    role="alert"
    class="flex items-start gap-3 rounded-lg border px-4 py-3"
    :class="[
      variant === 'info' && 'border-primary-200 bg-primary-50 text-primary-800',
      variant === 'success' && 'border-green-200 bg-green-50 text-green-800',
      variant === 'warning' && 'border-amber-200 bg-amber-50 text-amber-800',
      variant === 'error' && 'border-red-200 bg-red-50 text-red-800',
    ]"
  >
    <div class="flex-1">
      <p v-if="title" class="font-medium">{{ title }}</p>
      <p class="text-sm mt-0.5"><slot /></p>
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="rounded p-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
      aria-label="Dismiss"
      @click="$emit('dismiss')"
    >
      <span class="text-lg leading-none">&times;</span>
    </button>
  </div>
</template>
