<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseAlert from '../components/base/BaseAlert.vue'
import { useThemeStore } from '../stores/themeStore'
import { useStudentStore } from '../stores/studentStore'
import { useAuthStore } from '../stores/authStore'
import * as studentService from '../services/studentService'
import { useToast } from '../composables/useToast'

const router = useRouter()
const themeStore = useThemeStore()
const studentStore = useStudentStore()
const authStore = useAuthStore()
const toast = useToast()

const profilePublic = computed(() => studentStore.visibility)

const deleting = ref(false)
const deleteError = ref('')

async function onTogglePublic(val) {
  try {
    await studentStore.setVisibility(val)
    toast.success(val ? 'Profile is now public' : 'Profile is now private')
  } catch {
    toast.error('Failed to update visibility')
  }
}

async function deleteAccount() {
  deleteError.value = ''
  const ok = confirm(
    'Delete your SkillsBridge account? This will permanently remove your profile, projects, skills, and inbox messages.'
  )
  if (!ok) return
  deleting.value = true
  try {
    await studentService.deleteAccount()
    await authStore.logout()
    toast.success('Account deleted')
    router.push({ name: 'Home' })
  } catch (err) {
    deleteError.value = err.response?.data?.message || 'Failed to delete account'
  } finally {
    deleting.value = false
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Settings</h1>
        <p class="mt-1 text-slate-600">Customize your SkillsBridge experience.</p>
      </div>

      <BaseCard>
        <div class="flex items-center justify-between gap-6">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Theme</h2>
            <p class="text-sm text-slate-600">
              SkillsBridge is using the default light theme.
            </p>
          </div>
          <BaseButton size="sm" variant="secondary" @click="themeStore.resetToLight">
            Use light theme
          </BaseButton>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center justify-between gap-6">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Public profile</h2>
            <p class="text-sm text-slate-600">
              When public, recruiters can find you in Explore and message you from your profile.
            </p>
          </div>
          <BaseToggle
            :model-value="profilePublic"
            label=""
            @update:model-value="onTogglePublic"
          />
        </div>
      </BaseCard>

      <BaseCard>
        <div class="flex items-center justify-between gap-6">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Profile settings</h2>
            <p class="text-sm text-slate-600">
              Update your bio, skills, contact links, and profile photo.
            </p>
          </div>
          <BaseButton size="sm" variant="secondary" @click="$router.push({ name: 'EditProfile' })">
            Edit profile
          </BaseButton>
        </div>
      </BaseCard>

      <BaseCard class="border border-red-200 bg-red-50/60 dark:border-red-900/40 dark:bg-red-950/30">
        <h2 class="text-lg font-semibold text-red-700 dark:text-red-200">Danger zone</h2>
        <p class="mt-1 text-sm text-red-700/90 dark:text-red-200/90">
          Deleting your account permanently removes your profile, projects, skills, and inbox messages.
        </p>
        <BaseAlert v-if="deleteError" variant="error" class="mt-4" @dismiss="deleteError = ''">
          {{ deleteError }}
        </BaseAlert>
        <div class="mt-4 flex justify-end">
          <BaseButton class="bg-red-600 hover:bg-red-700 text-white" :loading="deleting" @click="deleteAccount">
            Delete account
          </BaseButton>
        </div>
      </BaseCard>
    </div>
  </DashboardLayout>
</template>

