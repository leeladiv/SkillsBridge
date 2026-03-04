<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  label: String,
  name: String,
  placeholder: String,
  error: String,
  disabled: Boolean,
  required: Boolean,
  hint: String,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full">
    <label v-if="label" :for="name" class="mb-1 block text-sm font-medium text-slate-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      class="block w-full rounded-lg border px-3 py-2 text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500"
      :class="error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-primary-500 focus:ring-primary-500'"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-slate-500">{{ hint }}</p>
  </div>
</template>
