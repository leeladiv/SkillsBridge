<script setup>
import { useToast } from '../../composables/useToast'

const { toasts, remove } = useToast()

const variantClasses = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-primary-600 text-white',
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-80 pointer-events-none">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[variantClasses[toast.variant] || variantClasses.info]"
          class="pointer-events-auto flex items-start gap-2 rounded-lg px-4 py-3 shadow-lg text-sm"
          role="alert"
        >
          <span class="flex-1">{{ toast.message }}</span>
          <button
            type="button"
            class="ml-2 shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 focus:outline-none"
            aria-label="Dismiss"
            @click="remove(toast.id)"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
