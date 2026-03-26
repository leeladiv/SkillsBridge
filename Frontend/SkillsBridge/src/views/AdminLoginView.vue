<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useFormValidation } from '../composables/useFormValidation'
import { useToast } from '../composables/useToast'
import BaseButton from '../components/base/BaseButton.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BasePasswordInput from '../components/base/BasePasswordInput.vue'
import BaseAlert from '../components/base/BaseAlert.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const toast = useToast()
const { required, email } = useFormValidation()

const form = ref({ email: '', password: '' })
const errors = ref({})
const loading = ref(false)
const alertError = ref('')

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
    const result = await authStore.loginAdmin({
      email: form.value.email,
      password: form.value.password,
    })
    if (result.success) {
      toast.success('Admin login successful')
      const redirect = String(route.query.redirect || '/admin')
      router.push(redirect.startsWith('/') ? { path: redirect } : { path: '/admin' })
    } else {
      alertError.value = result.error || 'Admin login failed'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <AppNavbar />

    <main
      class="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl sm:mt-10 sm:flex-row"
    >
      <!-- Left panel (match normal login layout) -->
      <section
        class="relative flex w-full flex-col justify-between bg-blue-600 px-8 py-10 text-white sm:w-1/2 sm:min-w-[320px] sm:px-12"
      >
        <div>
          <div class="flex items-center gap-3">
            <img
              src="/public/SkillsBridge Logo1.png"
              alt="skillsbridgelogo"
              class="h-10 w-auto object-contain"
            >
          </div>

          <h1 class="mt-10 text-3xl font-semibold leading-tight sm:text-4xl">
            Welcome back to
            <span class="block font-bold">admin dashboard</span>
          </h1>

          <p class="mt-4 max-w-md text-sm sm:text-base text-blue-100">
            Log in to manage universities, users, analytics, and platform settings.
          </p>
        </div>

        <div class="mt-10 rounded-2xl bg-blue-700/70 p-5 text-sm sm:text-base">
          <p class="font-medium">
            Security note
          </p>
          <p class="mt-2 text-blue-100">
            Use your admin credentials only. This area is restricted.
          </p>
        </div>
      </section>

      <!-- Right form panel -->
      <section class="flex w-full min-w-0 flex-1 items-stretch bg-slate-50 px-6 py-8 sm:px-10 sm:py-10">
        <div class="w-full min-w-0 max-w-xl">
          <header>
            <h2 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Admin log in
            </h2>
            <p class="mt-2 text-sm text-slate-600">
              Enter your admin email and password.
            </p>
          </header>

          <BaseAlert
            v-if="alertError"
            variant="error"
            class="mt-4"
            @dismiss="alertError = ''"
          >
            {{ alertError }}
          </BaseAlert>

          <div class="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-7">
            <form
              class="space-y-4"
              @submit.prevent="onSubmit"
            >
              <BaseInput
                v-model="form.email"
                type="email"
                label="Admin email"
                name="email"
                placeholder="admin@example.com"
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
              <BaseButton
                type="submit"
                class="mt-2 w-full"
                :loading="loading"
              >
                Log in
              </BaseButton>

              <div class="pt-4 text-center text-sm text-slate-600">
                Not an admin?
                <router-link
                  to="/login"
                  class="ml-1 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  User login
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

