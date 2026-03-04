<script setup>
defineProps({
  padding: { type: String, default: 'default' }, // none | default | lg
})
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 bg-white shadow-sm"
    :class="[
      padding === 'none' && 'p-0',
      padding === 'default' && 'p-4',
      padding === 'lg' && 'p-6',
    ]"
  >
    <slot />
  </div>
</template>
