<script setup>
import { onMounted, ref, computed } from 'vue'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseTag from '../components/base/BaseTag.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import BaseButton from '../components/base/BaseButton.vue'
import { useStudentStore } from '../stores/studentStore'
import { useToast } from '../composables/useToast'

const studentStore = useStudentStore()
const toast = useToast()
const loading = ref(true)

const profile = computed(() => studentStore.profile)
const projects = computed(() => studentStore.projects)

onMounted(async () => {
  loading.value = true
  try {
    if (!studentStore.profile) await studentStore.fetchProfile()
    if (!studentStore.projects.length) await studentStore.fetchProjects()
  } catch {
    toast.error('Failed to load preview')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <DashboardLayout>
    <div class="mx-auto max-w-5xl space-y-6">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Preview</h1>
          <p class="mt-1 text-slate-600">This is how your profile looks to recruiters.</p>
        </div>
        <BaseButton size="sm" variant="secondary" @click="$router.push({ name: 'EditProfile' })">
          Edit profile
        </BaseButton>
      </div>

      <div v-if="loading" class="flex justify-center py-16">
        <BaseSpinner size="lg" />
      </div>

      <template v-else>
        <BaseCard padding="lg">
          <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div class="shrink-0">
              <div
                class="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center text-3xl text-slate-500 overflow-hidden"
              >
                <img v-if="profile?.image" :src="profile.image" :alt="profile?.fullName" class="h-full w-full object-cover" />
                <span v-else>{{ (profile?.fullName || '?')[0] }}</span>
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <h2 class="text-2xl font-bold text-slate-900">{{ profile?.fullName }}</h2>
              <p v-if="profile?.university?.name" class="mt-1 inline-flex items-center rounded-full bg-indigo-50 px-3 py-0.5 text-sm font-semibold text-indigo-800">
                {{ profile.university.name }}
              </p>
              <p v-if="profile?.bio" class="mt-3 text-slate-700">{{ profile.bio }}</p>
              <div v-if="profile?.skills?.length" class="mt-4 flex flex-wrap gap-1">
                <BaseTag v-for="s in profile.skills" :key="s">{{ s }}</BaseTag>
              </div>
            </div>
          </div>
        </BaseCard>

        <div>
          <h3 class="text-lg font-semibold text-slate-900">Projects</h3>
          <p class="mt-1 text-sm text-slate-600">Recruiters will review these to understand your impact.</p>

          <div v-if="!projects.length" class="mt-4">
            <BaseCard>
              <p class="text-slate-600">No projects yet. Add at least 2 projects to increase recruiter interest.</p>
            </BaseCard>
          </div>

          <div v-else class="mt-4 grid gap-4 sm:grid-cols-2">
            <BaseCard v-for="p in projects" :key="p.id" class="h-full">
              <p class="font-semibold text-slate-900">{{ p.title }}</p>
              <p v-if="p.description" class="mt-2 text-sm text-slate-600">{{ p.description }}</p>
              <div v-if="p.technologies?.length" class="mt-2 flex flex-wrap gap-1">
                <BaseTag v-for="t in p.technologies" :key="t" size="sm">{{ t }}</BaseTag>
              </div>
            </BaseCard>
          </div>
        </div>
      </template>
    </div>
  </DashboardLayout>
</template>

