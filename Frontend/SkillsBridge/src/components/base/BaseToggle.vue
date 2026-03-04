<script setup>
defineProps({
  modelValue: Boolean,
  label: String,
  disabled: Boolean,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="inline-flex cursor-pointer items-center gap-3" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
    <span v-if="label" class="text-sm font-medium text-slate-700">{{ label }}</span>
    <div class="relative inline-block">
      <input
        type="checkbox"
        class="peer sr-only"
        :checked="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <div
        class="h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2 peer-disabled:cursor-not-allowed"
      />
      <div
        class="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:left-6 peer-checked:translate-x-0"
      />
    </div>
  </label>
</template>
