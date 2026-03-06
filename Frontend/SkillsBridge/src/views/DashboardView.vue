<script setup>
import { onMounted, ref } from 'vue'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import ProfileSummaryCard from '../components/student/ProfileSummaryCard.vue'
import ProjectCard from '../components/student/ProjectCard.vue'
import ProjectFormModal from '../components/student/ProjectFormModal.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseToggle from '../components/base/BaseToggle.vue'
import BaseEmpty from '../components/base/BaseEmpty.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import { useStudentStore } from '../stores/studentStore'
import { useToast } from '../composables/useToast'

const studentStore = useStudentStore()
const toast = useToast()
const showProjectModal = ref(false)
const editingProject = ref(null)

onMounted(async () => {
  try {
    await studentStore.fetchProfile()
    await studentStore.fetchProjects()
  } catch {
    toast.error('Failed to load profile data')
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
      try {
        await studentStore.uploadProjectFile(project.id, file)
        toast.success('File attached to project')
      } catch {
        toast.error('Project saved but file upload failed')
      }
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

async function onVisibilityChange(checked) {
  try {
    await studentStore.setVisibility(checked)
    toast.success(checked ? 'Profile is now public' : 'Profile is now private')
  } catch {
    toast.error('Failed to update visibility')
  }
}

async function handleProjectUpload(payload) {
  try {
    await studentStore.uploadProjectFile(payload.project.id, payload.file)
    toast.success('File uploaded successfully')
  } catch {
    toast.error('Failed to upload file')
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="max-w-4xl space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p class="mt-1 text-slate-600">Manage your skills portfolio.</p>
      </div>

      <ProfileSummaryCard
        :profile="studentStore.profile"
        :visibility="studentStore.visibility"
      />

      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-slate-900">Profile visibility</h2>
          <p class="text-sm text-slate-600">Allow recruiters to see your profile on Explore.</p>
        </div>
        <BaseToggle
          :model-value="studentStore.visibility"
          label="Public"
          @update:model-value="onVisibilityChange"
        />
      </div>

      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-slate-900">Projects</h2>
          <BaseButton size="sm" @click="openAddProject">Add project</BaseButton>
        </div>

        <div v-if="studentStore.loading && !studentStore.projects.length" class="flex justify-center py-12">
          <BaseSpinner size="lg" />
        </div>
        <div v-else-if="!studentStore.projects.length" class="py-8">
          <BaseEmpty
            title="No projects yet"
            description="Add your first project to showcase your work."
          >
            <template #actions>
              <BaseButton @click="openAddProject">Add project</BaseButton>
            </template>
          </BaseEmpty>
        </div>
        <div v-else class="grid gap-4 sm:grid-cols-2">
          <ProjectCard
            v-for="p in studentStore.projects"
            :key="p.id"
            :project="p"
            editable
            @edit="openEditProject"
            @delete="deleteProject"
            @upload="handleProjectUpload"
          />
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
