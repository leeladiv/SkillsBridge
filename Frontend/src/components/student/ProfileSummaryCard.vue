<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseCard from '../base/BaseCard.vue'
import BaseButton from '../base/BaseButton.vue'
import BaseTag from '../base/BaseTag.vue'

const props = defineProps({
  profile: { type: Object, default: null },
  visibility: { type: Boolean, default: true },
})

const router = useRouter()
const displaySkills = computed(() => (props.profile?.skills || []).slice(0, 5))
</script>

<template>
  <BaseCard padding="lg">
    <div class="flex flex-col sm:flex-row sm:items-start gap-4">
      <div class="flex-shrink-0">
        <div
          class="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-2xl text-slate-500 overflow-hidden"
        >
          <img
            v-if="profile?.image"
            :src="profile.image"
            :alt="profile?.fullName"
            class="h-full w-full object-cover"
          />
          <span v-else>{{ (profile?.fullName || '?')[0] }}</span>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <h2 class="text-lg font-semibold text-slate-900">{{ profile?.fullName || 'Your profile' }}</h2>
        <p v-if="profile?.bio" class="mt-1 text-sm text-slate-600 line-clamp-2">{{ profile.bio }}</p>
        <div v-if="displaySkills.length" class="mt-2 flex flex-wrap gap-1">
          <BaseTag v-for="s in displaySkills" :key="s" size="sm">{{ s }}</BaseTag>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          <BaseButton size="sm" @click="router.push({ name: 'EditProfile' })">Edit profile</BaseButton>
          <span
            class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
            :class="visibility ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'"
          >
            {{ visibility ? 'Profile public' : 'Profile private' }}
          </span>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
