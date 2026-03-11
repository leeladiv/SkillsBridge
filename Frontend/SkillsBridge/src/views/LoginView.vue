<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useFormValidation } from '../composables/useFormValidation'
import { useToast } from '../composables/useToast'
import * as authService from '../services/authService'
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
const resending = ref(false)
const alertError = ref('')
const showResendLink = ref(false)

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
  showResendLink.value = false
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
      showResendLink.value = result.error?.toLowerCase().includes('verify your email')
    }
  } finally {
    loading.value = false
  }
}

async function resendVerification() {
  if (!form.value.email) {
    toast.error('Enter your email above first')
    return
  }
  resending.value = true
  try {
    await authService.resendVerification(form.value.email)
    toast.success('Verification email sent. Check your inbox.')
    showResendLink.value = false
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to resend verification email')
  } finally {
    resending.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <AppNavbar />

    <main
      class="mx-auto flex max-w-6xl flex-row overflow-x-auto overflow-y-hidden rounded-3xl bg-white shadow-xl sm:mt-10"
    >
      <!-- Left panel (same structure as signup) -->
      <section
        class="relative flex w-[40%] min-w-[320px] flex-col justify-between bg-blue-600 px-8 py-10 text-white sm:px-12 md:max-w-md"
      >
        <div>
          <!-- Logo placeholder -->
          <div class="flex items-center gap-3">
            <div class="h-10 w-32 rounded bg-white/10" />
          </div>

          <h1 class="mt-10 text-3xl font-semibold leading-tight sm:text-4xl">
            Welcome back to
            <span class="block font-bold">your student portfolio</span>
          </h1>

          <p class="mt-4 max-w-md text-sm sm:text-base text-blue-100">
            Log in to update your SkillsBridge profile, publish new projects, and stay visible to recruiters and
            partners looking for talent from your university.
          </p>
        </div>

        <div class="mt-10 rounded-2xl bg-blue-700/70 p-5 text-sm sm:text-base">
          <p class="font-medium">“I can keep everything in one place.”</p>
          <p class="mt-2 text-blue-100">
            Instead of sending different CVs and links, I just share my SkillsBridge profile when I apply for roles or
            talk to recruiters.
          </p>
          <div class="mt-4 flex items-center justify-between text-xs font-medium text-blue-100/80">
            <span>Final-year student</span>
            <span class="text-yellow-300">★★★★★</span>
          </div>
        </div>
      </section>

      <!-- Right form panel -->
      <section class="flex min-w-[360px] flex-1 items-stretch bg-slate-50 px-6 py-8 sm:px-10 sm:py-10">
        <div class="w-full max-w-xl">
          <!-- Step indicator (single active dot to echo signup) -->
          <div class="mb-8 flex items-center gap-3">
            <span class="h-2 w-2 rounded-full bg-primary-600"></span>
            <span class="h-2 w-2 rounded-full bg-slate-300"></span>
            <span class="h-2 w-2 rounded-full bg-slate-300"></span>
          </div>

          <header>
            <h2 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Log in
            </h2>
            <p class="mt-2 text-sm text-slate-600">
              Enter your email and password to access your SkillsBridge account.
            </p>
          </header>

          <BaseAlert v-if="alertError" variant="error" class="mt-4" @dismiss="alertError = ''">
            {{ alertError }}
            <button
              v-if="showResendLink"
              type="button"
              class="mt-2 block text-sm font-semibold underline hover:no-underline"
              :disabled="resending"
              @click="resendVerification"
            >
              {{ resending ? 'Sending...' : 'Resend verification email' }}
            </button>
          </BaseAlert>

          <div class="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-7">
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
              <BasePasswordInput
                v-model="form.password"
                label="Password"
                name="password"
                placeholder="••••••••"
                :error="errors.password"
                required
              />
              <BaseButton type="submit" class="mt-2 w-full" :loading="loading">
                Log in
              </BaseButton>

              <div class="pt-4">
                <div class="flex items-center gap-3">
                  <div class="h-px flex-1 bg-slate-200" />
                  <span class="text-xs font-medium text-slate-500">OR</span>
                  <div class="h-px flex-1 bg-slate-200" />
                </div>

                <div class="mt-3 text-center text-sm text-slate-600">
                  Don&apos;t have an account?
                  <router-link
                    to="/register"
                    class="ml-1 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                  >
                    Sign up
                  </router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
