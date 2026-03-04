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
      toast.success('Account created successfully!')
      router.push({ name: 'Dashboard' })
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
  <div class="min-h-screen bg-slate-50">
    <AppNavbar />
    <main class="mx-auto max-w-md px-4 py-12">
      <h1 class="text-2xl font-bold text-slate-900">Create account</h1>
      <p class="mt-1 text-slate-600">Register as a student on SkillsBridge.</p>

      <BaseAlert v-if="alertError" variant="error" class="mt-4" @dismiss="alertError = ''">
        {{ alertError }}
      </BaseAlert>

      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <BaseInput
          v-model="form.fullName"
          label="Full name"
          name="fullName"
          placeholder="Jane Doe"
          :error="errors.fullName"
          required
        />
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
        <BasePasswordInput
          v-model="form.confirmPassword"
          label="Confirm password"
          name="confirmPassword"
          placeholder="********"
          :error="errors.confirmPassword"
          required
        />
        <BaseSelect
          v-model="form.universityId"
          label="University"
          name="university"
          placeholder="Select your university"
          :options="universityOptions"
          :error="errors.universityId"
        />
        <button
          type="button"
          class="text-sm text-primary-600 hover:underline"
          @click="showRequestUniversityModal = true"
        >
          University not listed? Request to add it
        </button>

        <BaseButton type="submit" class="w-full" :loading="loading">
          Sign up
        </BaseButton>
      </form>

      <p class="mt-4 text-center text-sm text-slate-600">
        Already have an account?
        <router-link to="/login" class="font-medium text-primary-600 hover:underline">Log in</router-link>
      </p>
    </main>

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
  </div>
</template>
