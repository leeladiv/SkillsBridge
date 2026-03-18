<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormValidation } from '../composables/useFormValidation'
import { useToast } from '../composables/useToast'
import * as authService from '../services/authService'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BasePasswordInput from '../components/base/BasePasswordInput.vue'
import BaseAlert from '../components/base/BaseAlert.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { password, match, required } = useFormValidation()

const token = computed(() => String(route.query.token || ''))
const form = ref({ password: '', confirmPassword: '' })
const errors = ref({})
const loading = ref(false)
const alertError = ref('')

function validate() {
  errors.value = {}
  const t = required(token.value, 'Token')
  if (t) errors.value.token = t
  const p = password(form.value.password)
  if (p) errors.value.password = p
  const m = match(form.value.password, form.value.confirmPassword, 'Passwords')
  if (m) errors.value.confirmPassword = m
  return Object.keys(errors.value).length === 0
}

async function onSubmit() {
  alertError.value = ''
  if (!validate()) return
  loading.value = true
  try {
    const data = await authService.resetPassword({ token: token.value, password: form.value.password })
    toast.success(data?.message || 'Password updated')
    router.push({ name: 'Login' })
  } catch (err) {
    alertError.value = err.response?.data?.message || 'Failed to reset password'
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
          <h1 class="text-2xl font-semibold tracking-tight text-slate-900">Reset password</h1>
          <p class="mt-2 text-sm text-slate-600">
            Choose a new password for your account.
          </p>
        </div>

        <div class="px-6 py-6 sm:px-8">
          <BaseAlert v-if="alertError" variant="error" class="mb-4" @dismiss="alertError = ''">
            {{ alertError }}
          </BaseAlert>

          <BaseAlert v-if="errors.token" variant="error" class="mb-4">
            {{ errors.token }}
          </BaseAlert>

          <form class="space-y-4" @submit.prevent="onSubmit">
            <BasePasswordInput
              v-model="form.password"
              label="New password"
              name="password"
              placeholder="••••••••"
              :error="errors.password"
              required
            />
            <BasePasswordInput
              v-model="form.confirmPassword"
              label="Confirm new password"
              name="confirmPassword"
              placeholder="••••••••"
              :error="errors.confirmPassword"
              required
            />
            <BaseButton type="submit" class="w-full" :loading="loading">
              Update password
            </BaseButton>
          </form>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

