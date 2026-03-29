<script setup>
import { ref, watch } from 'vue'
import BaseModal from '../base/BaseModal.vue'
import BaseInput from '../base/BaseInput.vue'
import BaseButton from '../base/BaseButton.vue'

const props = defineProps({
  show: Boolean,
  project: { type: Object, default: null },
})
const emit = defineEmits(['close', 'submit'])

const form = ref({
  title: '',
  description: '',
  technologies: [],
  techInput: '',
  links: [],
  file: null,
  fileName: '',
})

watch(
  () => props.project,
  (p) => {
    if (p) {
      form.value = {
        title: p.title || '',
        description: p.description || '',
        technologies: [...(p.technologies || [])],
        techInput: '',
        links: [...(p.links || [])],
        file: null,
        fileName: '',
      }
    } else {
      form.value = {
        title: '',
        description: '',
        technologies: [],
        techInput: '',
        links: [],
        file: null,
        fileName: '',
      }
    }
  },
  { immediate: true }
)

function addTech() {
  const t = form.value.techInput.trim()
  if (t && !form.value.technologies.includes(t)) {
    form.value.technologies.push(t)
    form.value.techInput = ''
  }
}

function removeTech(tech) {
  form.value.technologies = form.value.technologies.filter((x) => x !== tech)
}

function onFileSelect(event) {
  const file = event.target.files?.[0]
  if (file) {
    form.value.file = file
    form.value.fileName = file.name
  }
}

function removeFile() {
  form.value.file = null
  form.value.fileName = ''
}

function submit() {
  if (!form.value.title.trim()) return
  const payload = {
    title: form.value.title.trim(),
    description: form.value.description?.trim() || '',
    technologies: form.value.technologies,
    links: form.value.links,
  }
  if (props.project?.id) payload.id = props.project.id
  if (form.value.file) payload.file = form.value.file
  emit('submit', payload)
}
</script>

<template>
  <BaseModal :show="show" :title="project ? 'Edit project' : 'Add project'" size="lg" @close="emit('close')">
    <form @submit.prevent="submit" class="space-y-4">
      <BaseInput v-model="form.title" label="Title" name="title" required placeholder="Project name" />
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          v-model="form.description"
          name="description"
          rows="3"
          class="block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500"
          placeholder="Brief description"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Technologies</label>
        <div class="flex gap-2 flex-wrap">
          <input
            v-model="form.techInput"
            type="text"
            class="rounded-lg border border-slate-300 px-3 py-2 text-sm flex-1 min-w-[120px]"
            placeholder="Add technology"
            @keydown.enter.prevent="addTech"
          />
          <BaseButton type="button" variant="secondary" size="sm" @click="addTech">Add</BaseButton>
        </div>
        <div class="mt-2 flex flex-wrap gap-1">
          <span
            v-for="t in form.technologies"
            :key="t"
            class="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-sm"
          >
            {{ t }}
            <button type="button" class="hover:text-red-600" @click="removeTech(t)">&times;</button>
          </span>
        </div>
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Attach file (optional)</label>
        <div v-if="form.fileName" class="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <svg class="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          <span class="flex-1 truncate text-sm text-slate-700">{{ form.fileName }}</span>
          <button type="button" class="text-red-500 hover:text-red-700 text-sm" @click="removeFile">Remove</button>
        </div>
        <label v-else class="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500 hover:border-primary-400 hover:text-primary-600 transition-colors">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Choose a file to upload
          <input type="file" class="hidden" @change="onFileSelect" />
        </label>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <BaseButton type="button" variant="secondary" @click="emit('close')">Cancel</BaseButton>
        <BaseButton type="submit">Save</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
