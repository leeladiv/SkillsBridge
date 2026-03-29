import { ref } from 'vue'

const toasts = ref([])
let nextId = 0

export function useToast() {
  function add(message, variant = 'success', duration = 4000) {
    const id = ++nextId
    toasts.value.push({ id, message, variant })
    if (duration > 0) {
      setTimeout(() => remove(id), duration)
    }
  }

  function remove(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function success(message, duration) {
    add(message, 'success', duration)
  }

  function error(message, duration) {
    add(message, 'error', duration)
  }

  function info(message, duration) {
    add(message, 'info', duration)
  }

  return { toasts, add, remove, success, error, info }
}
