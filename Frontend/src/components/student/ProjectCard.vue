<script setup>
import { ref } from 'vue'
import BaseCard from '../base/BaseCard.vue'
import BaseButton from '../base/BaseButton.vue'
import BaseTag from '../base/BaseTag.vue'

const props = defineProps({
  project: { type: Object, required: true },
  editable: { type: Boolean, default: false },
})
const emit = defineEmits(['edit', 'delete', 'upload'])

const fileInput = ref(null)

function triggerUpload() {
  fileInput.value?.click()
}

function onFileChange(event) {
  const file = event.target.files?.[0]
  if (!file) return
  emit('upload', { project: props.project, file })
  event.target.value = ''
}
</script>

<template>
  <BaseCard padding="default" class="h-full flex flex-col">
    <div class="flex justify-between items-start gap-2">
      <h3 class="font-semibold text-slate-900">{{ project.title }}</h3>
      <div v-if="editable" class="flex gap-1 flex-shrink-0">
        <BaseButton variant="ghost" size="sm" @click="$emit('edit', project)">Edit</BaseButton>
        <BaseButton variant="ghost" size="sm" class="text-red-600" @click="$emit('delete', project)">Delete</BaseButton>
      </div>
    </div>
    <p v-if="project.description" class="mt-2 text-sm text-slate-600 line-clamp-3">{{ project.description }}</p>
    <div v-if="project.technologies?.length" class="mt-2 flex flex-wrap gap-1">
      <BaseTag v-for="t in project.technologies" :key="t" size="sm">{{ t }}</BaseTag>
    </div>
    <div v-if="project.links?.length" class="mt-2 flex flex-wrap gap-2">
      <a
        v-for="link in project.links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-primary-600 hover:underline"
      >
        {{ link.label || 'Link' }}
      </a>
    </div>

    <div v-if="editable" class="mt-auto pt-3 border-t border-slate-100">
      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary-600 transition-colors"
        @click="triggerUpload"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Upload file
      </button>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        @change="onFileChange"
      />
    </div>
  </BaseCard>
</template>
