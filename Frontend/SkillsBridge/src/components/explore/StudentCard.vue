<script setup>
import { useRouter } from 'vue-router'
import BaseCard from '../base/BaseCard.vue'
import BaseTag from '../base/BaseTag.vue'

const props = defineProps({
  student: { type: Object, required: true },
  universityName: { type: String, default: '' },
})

const router = useRouter()
const skills = (props.student.skills || []).slice(0, 4)

function goProfile() {
  router.push({ name: 'PublicProfile', params: { id: props.student.id } })
}
</script>

<template>
  <BaseCard padding="default" class="cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col" @click="goProfile">
    <div class="flex gap-4">
      <div class="flex-shrink-0 h-14 w-14 rounded-full bg-slate-200 flex items-center justify-center text-xl text-slate-600 overflow-hidden">
        <img v-if="student.image" :src="student.image" :alt="student.fullName" class="h-full w-full object-cover" />
        <span v-else>{{ (student.fullName || '?')[0] }}</span>
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="font-semibold text-slate-900 truncate">{{ student.fullName }}</h3>
        <p v-if="universityName" class="text-sm text-slate-500 truncate">{{ universityName }}</p>
        <p v-if="student.bio" class="mt-1 text-sm text-slate-600 line-clamp-2">{{ student.bio }}</p>
        <div v-if="skills.length" class="mt-2 flex flex-wrap gap-1">
          <BaseTag v-for="s in skills" :key="s" size="sm">{{ s }}</BaseTag>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
