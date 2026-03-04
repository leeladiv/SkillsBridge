<script setup>
defineProps({
  removable: Boolean,
  size: { type: String, default: 'md' }, // sm | md
})
defineEmits(['remove'])
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-full font-medium bg-primary-100 text-primary-800"
    :class="[
      size === 'sm' && 'px-2 py-0.5 text-xs',
      size === 'md' && 'px-2.5 py-1 text-sm',
    ]"
  >
    <slot />
    <button
      v-if="removable"
      type="button"
      class="rounded-full p-0.5 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Remove"
      @click="$emit('remove')"
    >
      <span class="leading-none">&times;</span>
    </button>
  </span>
</template>
