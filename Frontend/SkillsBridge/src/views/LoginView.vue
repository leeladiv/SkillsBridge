<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useFormValidation } from '../composables/useFormValidation'
import { useToast } from '../composables/useToast'
import BaseButton from '../components/base/BaseButton.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BasePasswordInput from '../components/base/BasePasswordInput.vue'
import BaseAlert from '../components/base/BaseAlert.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const toast = useToast()
const { required, email } = useFormValidation()

const form = ref({ email: '', password: '' })
const errors = ref({})
const loading = ref(false)
const alertError = ref('')

const redirectTo = computed(() => route.query.redirect || '/dashboard')

function validate() {
  errors.value = {}
  const e = email(form.value.email)
  if (e) errors.value.email = e
  const r = required(form.value.password, 'Password')
  if (r) errors.value.password = r
  return Object.keys(errors.value).length === 0
}

async function onSubmit() {
  alertError.value = ''
  if (!validate()) return
  loading.value = true
  try {
    const result = await authStore.login({
      email: form.value.email,
      password: form.value.password,
    })
    if (result.success) {
      toast.success('Logged in successfully')
      if (authStore.isAdmin) {
        router.push({ path: '/admin' })
      } else {
        const target = redirectTo.value
        router.push(target.startsWith('/') ? { path: target } : { name: 'Dashboard' })
      }
    } else {
      alertError.value = result.error || 'Login failed'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppNavbar />
    <main class="mx-auto max-w-md px-4 py-12">
      <h1 class="text-2xl font-bold text-slate-900">Log in</h1>
      <p class="mt-1 text-slate-600">Sign in to your SkillsBridge account.</p>

      <BaseAlert v-if="alertError" variant="error" class="mt-4" @dismiss="alertError = ''">
        {{ alertError }}
      </BaseAlert>

      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <BaseInput
          v-model="form.email"
          type="email"
          label="Email"
          name="email"
          placeholder="you@university.edu"
          :error="errors.email"
          required
        />
        <BasePasswordInput
          v-model="form.password"
          label="Password"
          name="password"
          placeholder="********"
          :error="errors.password"
          required
        />
        <BaseButton type="submit" class="w-full" :loading="loading">
          Log in
        </BaseButton>
      </form>

      <p class="mt-4 text-center text-sm text-slate-600">
        Don't have an account?
        <router-link to="/register" class="font-medium text-primary-600 hover:underline">Sign up</router-link>
      </p>
    </main>
  </div>
</template>
