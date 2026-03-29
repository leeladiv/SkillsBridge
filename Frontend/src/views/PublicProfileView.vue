<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '../components/layout/AppNavbar.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseTag from '../components/base/BaseTag.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseAlert from '../components/base/BaseAlert.vue'
import * as exploreService from '../services/exploreService'
import * as messageService from '../services/messageService'
import { useToast } from '../composables/useToast'
import { useFormValidation } from '../composables/useFormValidation'

const route = useRoute()
const toast = useToast()
const { required, email } = useFormValidation()
const profile = ref(null)
const loading = ref(true)
const notFound = ref(false)

const messageForm = ref({ fromName: '', fromEmail: '', subject: '', body: '' })
const messageErrors = ref({})
const messageSending = ref(false)
const messageSent = ref(false)

const universityName = computed(() => {
  return profile.value?.university?.name || ''
})

onMounted(async () => {
  const id = route.params.id
  try {
    const data = await exploreService.fetchPublicProfile(id)
    profile.value = data
    if (route.hash === '#message') {
      requestAnimationFrame(() => {
        const el = document.querySelector('#message')
        el?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
      })
    }
  } catch (err) {
    notFound.value = true
    toast.error(err.response?.data?.message || 'Profile not found')
  } finally {
    loading.value = false
  }
})

function validateMessage() {
  messageErrors.value = {}
  const n = required(messageForm.value.fromName, 'Name')
  if (n) messageErrors.value.fromName = n
  const e = email(messageForm.value.fromEmail)
  if (e) messageErrors.value.fromEmail = e
  const b = required(messageForm.value.body, 'Message')
  if (b) messageErrors.value.body = b
  return Object.keys(messageErrors.value).length === 0
}

async function sendMessage() {
  messageSent.value = false
  if (!profile.value?.id) return
  if (!validateMessage()) return
  messageSending.value = true
  try {
    await messageService.sendMessage({
      toUserId: profile.value.id,
      fromName: messageForm.value.fromName,
      fromEmail: messageForm.value.fromEmail,
      subject: messageForm.value.subject || undefined,
      body: messageForm.value.body,
    })
    messageSent.value = true
    messageForm.value = { fromName: '', fromEmail: '', subject: '', body: '' }
    toast.success('Message sent')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to send message')
  } finally {
    messageSending.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppNavbar />
    <main class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div v-if="loading" class="flex justify-center py-16">
        <BaseSpinner size="lg" />
      </div>
      <template v-else-if="profile && !notFound">
        <BaseCard padding="lg">
          <div class="flex flex-col sm:flex-row gap-6">
            <div class="shrink-0">
              <div
                class="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center text-3xl text-slate-500 overflow-hidden"
              >
                <img v-if="profile.image" :src="profile.image" :alt="profile.fullName" class="h-full w-full object-cover" />
                <span v-else>{{ (profile.fullName || '?')[0] }}</span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h1 class="text-2xl font-bold text-slate-900">{{ profile.fullName }}</h1>
              <p v-if="universityName" class="mt-1 inline-flex items-center rounded-full bg-primary-100 px-3 py-0.5 text-sm font-medium text-primary-800">
                {{ universityName }}
              </p>
              <p v-if="profile.bio" class="mt-3 text-slate-600">{{ profile.bio }}</p>
              <div v-if="profile.skills?.length" class="mt-4 flex flex-wrap gap-1">
                <BaseTag v-for="s in profile.skills" :key="s">{{ s }}</BaseTag>
              </div>
              <div v-if="profile.contact && (profile.contact.linkedIn || profile.contact.website)" class="mt-4 flex flex-wrap gap-4 text-sm">
                <a v-if="profile.contact.linkedIn" :href="profile.contact.linkedIn" target="_blank" rel="noopener" class="text-primary-600 hover:underline">LinkedIn</a>
                <a v-if="profile.contact.website" :href="profile.contact.website" target="_blank" rel="noopener" class="text-primary-600 hover:underline">Website</a>
              </div>
            </div>
          </div>
        </BaseCard>

        <div id="message" class="mt-8 scroll-mt-24">
          <BaseCard>
            <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div class="min-w-0">
                <h2 class="text-lg font-semibold text-slate-900">Message this student</h2>
                <p class="mt-1 text-sm text-slate-600">
                  Recruiter or partner? Send a message and the student will receive it in their dashboard inbox.
                </p>
              </div>
            </div>

            <BaseAlert v-if="messageSent" class="mt-4">
              Your message was sent successfully.
            </BaseAlert>

            <form class="mt-4 grid gap-4 sm:grid-cols-2" @submit.prevent="sendMessage">
              <BaseInput
                v-model="messageForm.fromName"
                label="Your name"
                name="fromName"
                placeholder="Recruiter name"
                :error="messageErrors.fromName"
                required
              />
              <BaseInput
                v-model="messageForm.fromEmail"
                type="email"
                label="Your email"
                name="fromEmail"
                placeholder="recruiter@company.com"
                :error="messageErrors.fromEmail"
                required
              />
              <div class="sm:col-span-2">
                <BaseInput
                  v-model="messageForm.subject"
                  label="Subject (optional)"
                  name="subject"
                  placeholder="Internship opportunity"
                />
              </div>
              <div class="sm:col-span-2">
                <label class="mb-1 block text-sm font-medium text-slate-700">Message</label>
                <textarea
                  v-model="messageForm.body"
                  rows="5"
                  class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="Introduce yourself and share next steps…"
                />
                <p v-if="messageErrors.body" class="mt-1 text-sm text-red-600">{{ messageErrors.body }}</p>
              </div>
              <div class="sm:col-span-2 flex justify-end">
                <BaseButton type="submit" :loading="messageSending">
                  Send message
                </BaseButton>
              </div>
            </form>
          </BaseCard>
        </div>

        <div v-if="profile.projects?.length" class="mt-8">
          <h2 class="text-lg font-semibold text-slate-900 mb-4">Projects</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <BaseCard v-for="p in profile.projects" :key="p.id" padding="default" class="h-full">
              <h3 class="font-semibold text-slate-900">{{ p.title }}</h3>
              <p v-if="p.description" class="mt-2 text-sm text-slate-600">{{ p.description }}</p>
              <div v-if="p.technologies?.length" class="mt-2 flex flex-wrap gap-1">
                <BaseTag v-for="t in p.technologies" :key="t" size="sm">{{ t }}</BaseTag>
              </div>
              <div v-if="p.links?.length" class="mt-2">
                <a
                  v-for="link in p.links"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener"
                  class="text-sm text-primary-600 hover:underline mr-3"
                >
                  {{ link.label || 'Link' }}
                </a>
              </div>
            </BaseCard>
          </div>
        </div>
      </template>
      <p v-else class="text-slate-600 py-12 text-center">Profile not found or is not public.</p>
    </main>
  </div>
</template>
