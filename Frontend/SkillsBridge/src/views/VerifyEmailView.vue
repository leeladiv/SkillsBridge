<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../services/api'
import BaseButton from '../components/base/BaseButton.vue'
import BaseAlert from '../components/base/BaseAlert.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'

const route = useRoute()
const router = useRouter()
const status = ref('loading') // loading | success | error
const message = ref('')
const loading = ref(true)

onMounted(async () => {
  const token = route.query.token
  if (!token) {
    status.value = 'error'
    message.value = 'Verification link is invalid. Please use the link from your email.'
    loading.value = false
    return
  }
  try {
    const res = await api.get('/auth/verify-email', { params: { token } })
    status.value = 'success'
    message.value = res.data?.message || 'Email verified successfully. You can now log in.'
  } catch (err) {
    status.value = 'error'
    message.value = err.response?.data?.message || 'Invalid or expired verification link. Please request a new one.'
  } finally {
    loading.value = false
  }
})

function goToLogin() {
  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <AppNavbar />

    <main
      class="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl sm:mt-10 sm:flex-row"
    >
      <section
        class="relative flex w-full flex-col justify-center bg-blue-600 px-8 py-10 text-white sm:w-[40%] sm:min-w-[320px] sm:px-12 md:max-w-md"
      >
        <h1 class="text-2xl font-semibold sm:text-3xl">
          Email verification
        </h1>
        <p class="mt-4 text-blue-100">
          Complete your SkillsBridge sign-up by verifying your email address.
        </p>
      </section>

      <section class="flex w-full min-w-0 flex-1 flex-col justify-center px-6 py-10 sm:px-10">
        <div class="w-full min-w-0 max-w-md">
          <div v-if="loading" class="text-center">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
            <p class="mt-4 text-slate-600">Verifying your email...</p>
          </div>

          <template v-else>
            <BaseAlert
              :variant="status === 'success' ? 'success' : 'error'"
              class="mb-6"
            >
              {{ message }}
            </BaseAlert>

            <BaseButton
              class="w-full"
              @click="goToLogin"
            >
              Go to log in
            </BaseButton>
          </template>
        </div>
      </section>
    </main>
  </div>
</template>
