<script setup>
import { onMounted, ref } from 'vue'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import BaseEmpty from '../components/base/BaseEmpty.vue'
import BaseButton from '../components/base/BaseButton.vue'
import { useStudentStore } from '../stores/studentStore'
import { useToast } from '../composables/useToast'
import ProjectFormModal from '../components/student/ProjectFormModal.vue'

const studentStore = useStudentStore()
const toast = useToast()

const showProjectModal = ref(false)
const editingProject = ref(null)
const projectFileInputs = ref({})

onMounted(async () => {
  try {
    await studentStore.fetchProjects()
  } catch {
    toast.error('Failed to load projects')
  }
})

function openAddProject() {
  editingProject.value = null
  showProjectModal.value = true
}

function openEditProject(project) {
  editingProject.value = project
  showProjectModal.value = true
}

async function saveProject(payload) {
  try {
    const file = payload.file
    delete payload.file
    let project
    if (editingProject.value?.id) {
      project = await studentStore.updateProject(editingProject.value.id, payload)
      toast.success('Project updated')
    } else {
      project = await studentStore.addProject(payload)
      toast.success('Project added')
    }
    if (file && project?.id) {
      await studentStore.uploadProjectFile(project.id, file)
      toast.success('File uploaded')
    }
    showProjectModal.value = false
    editingProject.value = null
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to save project')
  }
}

async function deleteProject(project) {
  if (!confirm('Delete this project?')) return
  try {
    await studentStore.removeProject(project.id)
    toast.success('Project deleted')
  } catch {
    toast.error('Failed to delete project')
  }
}

function setProjectFileInput(projectId, el) {
  if (!projectId) return
  if (el) projectFileInputs.value[projectId] = el
}

function triggerProjectUpload(project) {
  const el = projectFileInputs.value[project?.id]
  el?.click?.()
}

async function onProjectFileChange(project, event) {
  const file = event.target.files?.[0]
  if (!file) return
  try {
    await studentStore.uploadProjectFile(project.id, file)
    toast.success('File uploaded successfully')
  } catch {
    toast.error('Failed to upload file')
  } finally {
    event.target.value = ''
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="mx-auto max-w-6xl space-y-4">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Projects</h1>
          <p class="mt-1 text-slate-600">Manage the projects recruiters will review.</p>
        </div>
        <BaseButton size="sm" @click="openAddProject">Add project</BaseButton>
      </div>

      <div v-if="studentStore.loading && !studentStore.projects.length" class="flex justify-center py-12">
        <BaseSpinner size="lg" />
      </div>

      <div v-else-if="!studentStore.projects.length" class="py-8">
        <BaseEmpty title="No projects yet" description="Add your first project to showcase your work.">
          <template #actions>
            <BaseButton @click="openAddProject">Add project</BaseButton>
          </template>
        </BaseEmpty>
      </div>

      <div v-else class="rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div v-for="p in studentStore.projects" :key="p.id" class="flex items-center justify-between gap-4 p-4">
          <div class="flex items-center gap-4 min-w-0">
            <div class="h-12 w-12 shrink-0 rounded-xl bg-slate-100 ring-1 ring-slate-200" />
            <div class="min-w-0">
              <p class="truncate font-semibold text-slate-900">{{ p.title }}</p>
              <p class="mt-1 line-clamp-1 text-sm text-slate-600">{{ p.description || 'No description yet.' }}</p>
              <p class="mt-1 text-xs text-slate-500">
                {{ (p.technologies?.length || 0) }} skills • {{ (p.links?.length || 0) }} links
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              aria-label="Edit project"
              @click="openEditProject(p)"
            >
              ✎
            </button>
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              aria-label="Upload file"
              @click="triggerProjectUpload(p)"
            >
              ⭱
            </button>
            <input
              :ref="(el) => setProjectFileInput(p.id, el)"
              type="file"
              class="hidden"
              @change="(e) => onProjectFileChange(p, e)"
            />
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50"
              aria-label="Delete project"
              @click="deleteProject(p)"
            >
              🗑
            </button>
          </div>
        </div>
      </div>
    </div>

    <ProjectFormModal
      :show="showProjectModal"
      :project="editingProject"
      @close="showProjectModal = false; editingProject = null"
      @submit="saveProject"
    />
  </DashboardLayout>
</template>

