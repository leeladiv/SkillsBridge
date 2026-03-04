<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseTag from '../components/base/BaseTag.vue'
import BaseAlert from '../components/base/BaseAlert.vue'
import { useStudentStore } from '../stores/studentStore'
import { useToast } from '../composables/useToast'

const router = useRouter()
const studentStore = useStudentStore()
const toast = useToast()

const form = ref({
  fullName: '',
  bio: '',
  image: null,
  imagePreview: null,
  skills: [],
  skillInput: '',
  contact: { linkedIn: '', website: '', phone: '' },
})
const saving = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    await studentStore.fetchProfile()
  } catch {
    toast.error('Failed to load profile')
  }
  const p = studentStore.profile
  if (p) {
    const contactData = p.contact || (p.contactInfo ? JSON.parse(p.contactInfo) : {})
    form.value = {
      fullName: p.fullName || '',
      bio: p.bio || '',
      image: null,
      imagePreview: p.image || null,
      skills: [...(Array.isArray(p.skills) ? p.skills : [])],
      skillInput: '',
      contact: {
        linkedIn: contactData?.linkedIn || '',
        website: contactData?.website || '',
        phone: contactData?.phone || '',
      },
    }
  }
})

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  form.value.image = file
  const reader = new FileReader()
  reader.onload = () => {
    form.value.imagePreview = reader.result
  }
  reader.readAsDataURL(file)
}

function addSkill() {
  const s = form.value.skillInput.trim()
  if (s && !form.value.skills.includes(s)) {
    form.value.skills.push(s)
    form.value.skillInput = ''
  }
}

function removeSkill(skill) {
  form.value.skills = form.value.skills.filter((x) => x !== skill)
}

async function save() {
  error.value = ''
  if (!form.value.fullName?.trim()) {
    error.value = 'Name is required'
    return
  }
  saving.value = true
  try {
    const payload = {
      fullName: form.value.fullName.trim(),
      bio: form.value.bio?.trim() || '',
      contactInfo: JSON.stringify(form.value.contact),
      skills: form.value.skills,
    }
    if (form.value.image) {
      payload.image = form.value.imagePreview
    } else if (form.value.imagePreview && typeof form.value.imagePreview === 'string') {
      payload.image = form.value.imagePreview
    }
    await studentStore.updateProfile(payload)
    toast.success('Profile saved successfully')
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Failed to save'
    error.value = msg
    toast.error(msg)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="max-w-2xl space-y-6">
      <div class="flex items-center gap-4">
        <BaseButton variant="ghost" size="sm" @click="router.push({ name: 'Dashboard' })">← Back</BaseButton>
        <h1 class="text-2xl font-bold text-slate-900">Edit profile</h1>
      </div>

      <BaseAlert v-if="error" variant="error" dismissible @dismiss="error = ''">{{ error }}</BaseAlert>

      <BaseCard padding="lg">
        <form class="space-y-4" @submit.prevent="save">
          <div class="flex flex-col sm:flex-row gap-4 items-start">
            <div class="flex-shrink-0">
              <div
                class="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center text-3xl text-slate-500 overflow-hidden"
              >
                <img
                  v-if="form.imagePreview"
                  :src="form.imagePreview"
                  alt="Avatar"
                  class="h-full w-full object-cover"
                />
                <span v-else>{{ (form.fullName || '?')[0] }}</span>
              </div>
              <input
                type="file"
                accept="image/*"
                class="mt-2 text-sm text-slate-600 file:mr-2 file:rounded file:border-0 file:bg-primary-50 file:px-3 file:py-1 file:text-primary-700"
                @change="onFileChange"
              />
            </div>
            <div class="flex-1 w-full space-y-4">
              <BaseInput v-model="form.fullName" label="Full name" name="fullName" required />
              <div>
                <label class="mb-1 block text-sm font-medium text-slate-700">Bio</label>
                <textarea
                  v-model="form.bio"
                  rows="3"
                  class="block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Short bio"
                />
              </div>
            </div>
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">Skills</label>
            <div class="flex gap-2 flex-wrap">
              <input
                v-model="form.skillInput"
                type="text"
                class="rounded-lg border border-slate-300 px-3 py-2 text-sm flex-1 min-w-[120px]"
                placeholder="Add skill"
                @keydown.enter.prevent="addSkill"
              />
              <BaseButton type="button" variant="secondary" size="sm" @click="addSkill">Add</BaseButton>
            </div>
            <div class="mt-2 flex flex-wrap gap-1">
              <BaseTag v-for="s in form.skills" :key="s" removable @remove="removeSkill(s)">{{ s }}</BaseTag>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <BaseInput v-model="form.contact.linkedIn" label="LinkedIn" placeholder="https://linkedin.com/in/..." />
            <BaseInput v-model="form.contact.website" label="Website" placeholder="https://..." />
            <BaseInput v-model="form.contact.phone" label="Phone" placeholder="Optional" />
          </div>

          <div class="flex gap-2 pt-2">
            <BaseButton type="submit" :loading="saving">Save changes</BaseButton>
            <BaseButton type="button" variant="secondary" @click="router.push({ name: 'Dashboard' })">Cancel</BaseButton>
          </div>
        </form>
      </BaseCard>
    </div>
  </DashboardLayout>
</template>
