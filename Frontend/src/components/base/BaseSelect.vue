<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: String,
  name: String,
  options: { type: Array, default: () => [] }, // [{ value, label }]
  placeholder: String,
  error: String,
  disabled: Boolean,
  required: Boolean,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full">
    <label v-if="label" :for="name" class="mb-1 block text-sm font-medium text-slate-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :id="name"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      class="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-50 disabled:text-slate-500"
      :class="error && 'border-red-500 focus:ring-red-500'"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label ?? opt.value }}
      </option>
    </select>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
