<script setup>
defineProps({
  show: Boolean,
  title: String,
  size: { type: String, default: 'md' }, // sm | md | lg
})
const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-show="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @click.self="emit('close')"
      >
        <div class="fixed inset-0 bg-slate-900/60 transition-opacity" aria-hidden="true" />
        <div
          class="relative z-10 w-full max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl"
          :class="[
            size === 'sm' && 'max-w-sm',
            size === 'md' && 'max-w-md',
            size === 'lg' && 'max-w-lg',
          ]"
        >
          <div v-if="title" class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 id="modal-title" class="text-lg font-semibold text-slate-900">{{ title }}</h2>
            <button
              type="button"
              class="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Close"
              @click="emit('close')"
            >
              <span class="text-xl leading-none">&times;</span>
            </button>
          </div>
          <div class="p-6">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
