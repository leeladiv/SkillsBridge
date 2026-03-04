<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '../components/layout/AppNavbar.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseTag from '../components/base/BaseTag.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import * as exploreService from '../services/exploreService'
import { useToast } from '../composables/useToast'

const route = useRoute()
const toast = useToast()
const profile = ref(null)
const loading = ref(true)
const notFound = ref(false)

const universityName = computed(() => {
  return profile.value?.university?.name || ''
})

onMounted(async () => {
  const id = route.params.id
  try {
    const data = await exploreService.fetchPublicProfile(id)
    profile.value = data
  } catch (err) {
    notFound.value = true
    toast.error(err.response?.data?.message || 'Profile not found')
  } finally {
    loading.value = false
  }
})
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
            <div class="flex-shrink-0">
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
