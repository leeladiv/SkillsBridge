<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | ghost | danger | inverse
  type: { type: String, default: 'button' },
  disabled: Boolean,
  loading: Boolean,
  block: Boolean,
  size: { type: String, default: 'md' }, // sm | md | lg
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[
      block && 'w-full',
      size === 'sm' && 'px-3 py-1.5 text-sm',
      size === 'md' && 'px-4 py-2 text-sm',
      size === 'lg' && 'px-6 py-3 text-base',
      variant === 'primary' && 'bg-blue-600 text-white hover:bg-slate-500 focus:ring-slate-500',
      variant === 'secondary' && 'bg-blue-700 text-white hover:bg-slate-500 focus:ring-slate-400',
      variant === 'ghost' && 'bg-blue-600 text-white hover:bg-slate-500 focus:ring-slate-300',
      variant === 'danger' && 'bg-blue-600 text-white hover:bg-slate-500 focus:ring-red-500',
      variant === 'inverse' && 'bg-blue-700 text-white hover:bg-slate-500 focus:ring-white',
    ]"
  >
    <span v-if="loading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </button>
</template>
