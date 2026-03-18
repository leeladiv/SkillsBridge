<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormValidation } from '../composables/useFormValidation'
import { useToast } from '../composables/useToast'
import * as authService from '../services/authService'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseAlert from '../components/base/BaseAlert.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { email } = useFormValidation()

const form = ref({ email: String(route.query.email || '') })
const errors = ref({})
const loading = ref(false)
const alertInfo = ref('')

function validate() {
  errors.value = {}
  const e = email(form.value.email)
  if (e) errors.value.email = e
  return Object.keys(errors.value).length === 0
}

async function onSubmit() {
  alertInfo.value = ''
  if (!validate()) return
  loading.value = true
  try {
    const data = await authService.forgotPassword(form.value.email)
    alertInfo.value = data?.message || 'If an account exists for that email, a reset link has been sent.'
    toast.success('If your email is registered, you’ll receive a reset link.')
    if (data?.resetToken && data?.resetUrl) {
      router.push({ name: 'ResetPassword', query: { token: data.resetToken } })
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to request password reset')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <AppNavbar />

    <main class="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="overflow-hidden rounded-3xl bg-white shadow-xl">
        <div class="border-b border-slate-200 bg-slate-50 px-6 py-6 sm:px-8">
          <h1 class="text-2xl font-semibold tracking-tight text-slate-900">Forgot password</h1>
          <p class="mt-2 text-sm text-slate-600">
            Enter your email and we’ll send you a link to reset your password.
          </p>
        </div>

        <div class="px-6 py-6 sm:px-8">
          <BaseAlert v-if="alertInfo" class="mb-4">
            {{ alertInfo }}
          </BaseAlert>

          <form class="space-y-4" @submit.prevent="onSubmit">
            <BaseInput
              v-model="form.email"
              type="email"
              label="Email"
              name="email"
              placeholder="alex@example.com"
              :error="errors.email"
              required
            />
            <BaseButton type="submit" class="w-full" :loading="loading">
              Send reset link
            </BaseButton>

            <div class="text-center text-sm text-slate-600">
              Remembered your password?
              <button
                type="button"
                class="ml-1 font-semibold text-primary-600 hover:underline"
                @click="router.push({ name: 'Login', query: { email: form.email } })"
              >
                Back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

