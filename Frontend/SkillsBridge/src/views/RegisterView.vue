<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useUniversityStore } from '../stores/universityStore'
import { useFormValidation } from '../composables/useFormValidation'
import { useToast } from '../composables/useToast'
import BaseButton from '../components/base/BaseButton.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BasePasswordInput from '../components/base/BasePasswordInput.vue'
import BaseSelect from '../components/base/BaseSelect.vue'
import BaseAlert from '../components/base/BaseAlert.vue'
import BaseModal from '../components/base/BaseModal.vue'
import AppNavbar from '../components/layout/AppNavbar.vue'

const router = useRouter()
const authStore = useAuthStore()
const universityStore = useUniversityStore()
const toast = useToast()
const { required, email, password, match } = useFormValidation()

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  universityId: '',
})
const errors = ref({})
const loading = ref(false)
const alertError = ref('')
const showRequestUniversityModal = ref(false)
const requestUniversityName = ref('')
const requestSubmitting = ref(false)

const universityOptions = ref([])

onMounted(async () => {
  await universityStore.fetchUniversities()
  universityOptions.value = universityStore.universities.map((u) => ({ value: u.id, label: u.name }))
})

function validate() {
  errors.value = {}
  const r1 = required(form.value.fullName, 'Full name')
  if (r1) errors.value.fullName = r1
  const e = email(form.value.email)
  if (e) errors.value.email = e
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
    const result = await authStore.register({
      fullName: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
      universityId: form.value.universityId || undefined,
    })
    if (result.success) {
      toast.success('Check your email to verify your account.')
      router.push({ name: 'Login' })
    } else {
      alertError.value = result.error || 'Registration failed'
      toast.error(result.error || 'Registration failed')
    }
  } finally {
    loading.value = false
  }
}

async function submitUniversityRequest() {
  if (!requestUniversityName.value.trim()) return
  requestSubmitting.value = true
  try {
    const result = await universityStore.requestUniversity({
      universityName: requestUniversityName.value.trim(),
      requesterEmail: form.value.email || undefined,
    })
    if (result.success) {
      toast.success('University request submitted! An admin will review it shortly.')
      showRequestUniversityModal.value = false
      requestUniversityName.value = ''
    } else {
      toast.error(result.error || 'Failed to submit request')
    }
  } finally {
    requestSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <AppNavbar />

    <main
      class="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl sm:mt-10 sm:flex-row"
    >
      <!-- Left marketing panel -->
      <section
        class="relative flex w-full flex-col justify-between bg-blue-600 px-8 py-10 text-white sm:w-[40%] sm:min-w-[320px] sm:px-12 md:max-w-md"
      >
        <div>
          <!-- Logo placeholder (replace with your logo image) -->
          <div class="flex items-center gap-3">
            <img src="/public/SkillsBridge Logo.jpeg" alt="skillsbridgelogo" class="h-10 w-auto object-contain" />
          </div>

          <h1 class="mt-10 text-3xl font-semibold leading-tight sm:text-4xl">
            Let&apos;s set up your
            <span class="block font-bold">SkillsBridge profile</span>
          </h1>

          <p class="mt-4 max-w-md text-sm sm:text-base text-blue-100">
            SkillsBridge helps students turn real coursework and projects into a professional portfolio that recruiters
            can actually search, filter, and understand.
          </p>
        </div>

        <div class="mt-10 rounded-2xl bg-blue-700/70 p-5 text-sm sm:text-base">
          <p class="font-medium">“My work finally makes sense to recruiters.”</p>
          <p class="mt-2 text-blue-100">
            With one SkillsBridge profile I can showcase my assignments, side projects, and skills in a way that feels
            familiar to hiring teams.
          </p>
          <div class="mt-4 flex items-center justify-between text-xs font-medium text-blue-100/80">
            <span>Computer Science student</span>
            <span class="text-yellow-300">★★★★★</span>
          </div>
        </div>
      </section>

      <!-- Right form panel -->
      <section class="flex w-full min-w-0 flex-1 items-stretch bg-slate-50 px-6 py-8 sm:px-10 sm:py-10">
        <div class="w-full min-w-0 max-w-xl">
          <header>
            <h2 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Let&apos;s get started
            </h2>
            <p class="mt-2 text-sm text-slate-600">
              Create your SkillsBridge student account to showcase your projects and skills.
            </p>
          </header>

          <BaseAlert v-if="alertError" variant="error" class="mt-4" @dismiss="alertError = ''">
            {{ alertError }}
          </BaseAlert>

          <div class="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-7">
            <form class="space-y-4" @submit.prevent="onSubmit">
              <BaseInput
                v-model="form.fullName"
                label="Full name"
                name="fullName"
                placeholder="Alex Parkinson"
                :error="errors.fullName"
                required
              />
              <BaseInput
                v-model="form.email"
                type="email"
                label="Email"
                name="email"
                placeholder="alex@example.com"
                :error="errors.email"
                required
              />
              <BaseSelect
                v-model="form.universityId"
                label="University"
                name="university"
                placeholder="Choose your university"
                :options="universityOptions"
                :error="errors.universityId"
              />
              <BasePasswordInput
                v-model="form.password"
                label="Password"
                name="password"
                placeholder="••••••••"
                :error="errors.password"
                required
              />
              <BasePasswordInput
                v-model="form.confirmPassword"
                label="Confirm password"
                name="confirmPassword"
                placeholder="••••••••"
                :error="errors.confirmPassword"
                required
              />

              <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p class="text-xs text-slate-600">
                    Can&apos;t find your university?
                  </p>
                  <button
                    type="button"
                    class="text-left text-xs font-semibold text-primary-600 hover:underline"
                    @click="showRequestUniversityModal = true"
                  >
                    Request to add it
                  </button>
                </div>
              </div>

              <BaseButton type="submit" class="mt-2 w-full" :loading="loading">
                Get started
              </BaseButton>

              <div class="pt-4">
                <div class="flex items-center gap-3">
                  <div class="h-px flex-1 bg-slate-200" />
                  <span class="text-xs font-medium text-slate-500">OR</span>
                  <div class="h-px flex-1 bg-slate-200" />
                </div>

                <div class="mt-3 text-center text-sm text-slate-600">
                  Already have an account?
                  <router-link
                    to="/login"
                    class="ml-1 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                  >
                    Log in
                  </router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <BaseModal
        :show="showRequestUniversityModal"
        title="Request university"
        @close="showRequestUniversityModal = false"
      >
        <p class="mb-3 text-sm text-slate-600">
          Enter the full name of your university. An admin will review and add it.
        </p>
        <BaseInput
          v-model="requestUniversityName"
          label="University name"
          placeholder="Your University Name"
        />
        <div class="mt-4 flex justify-end gap-2">
          <BaseButton variant="secondary" @click="showRequestUniversityModal = false">Cancel</BaseButton>
          <BaseButton :loading="requestSubmitting" @click="submitUniversityRequest">Submit request</BaseButton>
        </div>
      </BaseModal>
    </main>
  </div>
</template>