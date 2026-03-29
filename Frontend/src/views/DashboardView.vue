<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import ProfileSummaryCard from '../components/student/ProfileSummaryCard.vue'
import ProjectCard from '../components/student/ProjectCard.vue'
import ProjectFormModal from '../components/student/ProjectFormModal.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseToggle from '../components/base/BaseToggle.vue'
import BaseEmpty from '../components/base/BaseEmpty.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseTag from '../components/base/BaseTag.vue'
import BaseInput from '../components/base/BaseInput.vue'
import { useStudentStore } from '../stores/studentStore'
import { useToast } from '../composables/useToast'

const studentStore = useStudentStore()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const showProjectModal = ref(false)
const editingProject = ref(null)
const selectedMessageId = ref('')
const projectFileInputs = ref({})
const skillInput = ref('')
const savingSkills = ref(false)

const mySkills = computed(() => studentStore.profile?.skills || [])

async function addSkillQuick() {
  const s = String(skillInput.value || '').trim()
  if (!s) return
  if (mySkills.value.includes(s)) {
    skillInput.value = ''
    return
  }
  savingSkills.value = true
  try {
    await studentStore.updateProfile({ skills: [...mySkills.value, s] })
    toast.success('Skill added')
    skillInput.value = ''
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to add skill')
  } finally {
    savingSkills.value = false
  }
}

async function removeSkillQuick(skill) {
  const next = mySkills.value.filter((x) => x !== skill)
  savingSkills.value = true
  try {
    await studentStore.updateProfile({ skills: next })
    toast.success('Skill removed')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to remove skill')
  } finally {
    savingSkills.value = false
  }
}

const selectedMessage = computed(() => {
  return studentStore.inbox.find((m) => m.id === selectedMessageId.value) || null
})

const firstName = computed(() => {
  const name = studentStore.profile?.fullName || ''
  return name.split(' ')[0] || 'there'
})

const stats = computed(() => {
  const unread = studentStore.inbox.filter((m) => !m.readAt).length
  const skillsCount = (studentStore.profile?.skills || []).length
  const projectsCount = studentStore.projects.length
  const profileComplete = Math.min(100, Math.round((skillsCount > 0 ? 40 : 0) + (projectsCount > 0 ? 40 : 0) + (studentStore.profile?.bio ? 20 : 0)))
  return [
    { label: 'Profile complete', value: `${profileComplete}%`, bg: 'bg-amber-100', icon: '📈' },
    { label: 'Projects', value: String(projectsCount), bg: 'bg-indigo-100', icon: '✅' },
    { label: 'Unread messages', value: String(unread), bg: 'bg-rose-100', icon: '✉' },
    { label: 'Profile views', value: '—', bg: 'bg-slate-100', icon: '👁' },
  ]
})

const todayLabel = computed(() => {
  try {
    return new Date().toLocaleDateString(undefined, { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
})

onMounted(async () => {
  try {
    await studentStore.fetchProfile()
    await studentStore.fetchProjects()
    await studentStore.fetchInbox({ limit: 30 })
    if (route.query.newProject === '1') {
      openAddProject()
      router.replace({ query: { ...route.query, newProject: undefined } })
    }
    if (route.hash) {
      requestAnimationFrame(() => {
        const el = document.querySelector(route.hash)
        el?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
      })
    }
  } catch {
    toast.error('Failed to load profile data')
  }
})

watch(
  () => route.query.newProject,
  (val) => {
    if (val === '1') {
      openAddProject()
      router.replace({ query: { ...route.query, newProject: undefined } })
    }
  }
)

watch(
  () => route.hash,
  (hash) => {
    if (!hash) return
    requestAnimationFrame(() => {
      const el = document.querySelector(hash)
      el?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
    })
  }
)

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
  await handleProjectUpload({ project, file })
  event.target.value = ''
}

async function openMessage(message) {
  selectedMessageId.value = message.id
  if (!message.readAt) {
    try {
      await studentStore.markMessageRead(message.id)
    } catch {
      // ignore
    }
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="mx-auto max-w-6xl space-y-6">
      <!-- Welcome banner (tailored to reference) -->
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-[#efeaff] shadow-sm">
        <div class="grid gap-6 p-6 sm:p-8 lg:grid-cols-5">
          <div class="lg:col-span-3">
            <p class="text-sm font-semibold text-slate-700">Dashboard</p>
            <p class="mt-1 text-xs text-slate-600">{{ todayLabel }}</p>
            <h1 class="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Hi, {{ firstName }}
            </h1>
            <p class="mt-2 text-slate-700">
              Ready to strengthen your portfolio and connect with recruiters on SkillsBridge?
            </p>
            <div class="mt-6 flex flex-wrap gap-2">
              <BaseButton size="sm" @click="openAddProject">Add project</BaseButton>
              <BaseButton size="sm" variant="secondary" @click="$router.push({ name: 'EditProfile' })">
                Edit profile
              </BaseButton>
            </div>
          </div>

          <div class="lg:col-span-2">
            <!-- professional illustration closer to reference -->
            <svg viewBox="0 0 560 260" class="h-40 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="pBg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#ede9fe" />
                  <stop offset="1" stop-color="#e0f2fe" />
                </linearGradient>
                <linearGradient id="pHair" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#4c1d95" />
                  <stop offset="1" stop-color="#7c3aed" />
                </linearGradient>
                <linearGradient id="pShirt" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#fbbf24" />
                  <stop offset="1" stop-color="#f59e0b" />
                </linearGradient>
                <linearGradient id="pLaptop" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#1f2937" />
                  <stop offset="1" stop-color="#374151" />
                </linearGradient>
                <filter id="pShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.12" />
                </filter>
              </defs>

              <rect x="0" y="0" width="560" height="260" rx="26" fill="url(#pBg)" opacity="0.55" />

              <!-- desk -->
              <g filter="url(#pShadow)">
                <rect x="138" y="182" width="330" height="28" rx="14" fill="#ffffff" opacity="0.9" />
              </g>

              <!-- laptop -->
              <g filter="url(#pShadow)">
                <rect x="260" y="138" width="190" height="66" rx="16" fill="url(#pLaptop)" />
                <rect x="276" y="152" width="118" height="10" rx="5" fill="#93c5fd" opacity="0.35" />
                <circle cx="420" cy="171" r="10" fill="#a78bfa" opacity="0.35" />
                <rect x="244" y="202" width="224" height="20" rx="10" fill="#111827" opacity="0.65" />
              </g>

              <!-- cup -->
              <g filter="url(#pShadow)">
                <rect x="206" y="164" width="28" height="34" rx="8" fill="#ffffff" opacity="0.92" />
                <path d="M234 172h6c6 0 6 18 0 18h-6" fill="none" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" />
                <rect x="206" y="196" width="28" height="6" rx="3" fill="#e2e8f0" />
              </g>

              <!-- character -->
              <g transform="translate(82,38)">
                <!-- hair -->
                <path
                  d="M314 28c28 0 54 18 54 48 0 26-10 48-22 66-10 14-26 18-40 10-18-10-40-36-40-70 0-30 20-54 48-54z"
                  fill="url(#pHair)"
                  opacity="0.95"
                />
                <!-- face -->
                <ellipse cx="316" cy="86" rx="26" ry="28" fill="#fde3d2" />
                <!-- neck -->
                <rect x="304" y="110" width="24" height="18" rx="8" fill="#fcd7c2" />
                <!-- shirt -->
                <path d="M260 208c10-46 40-84 56-84s46 38 56 84H260z" fill="url(#pShirt)" opacity="0.95" />
                <!-- arm -->
                <path d="M272 168c18-18 46-20 66-6" fill="none" stroke="#fde3d2" stroke-width="12" stroke-linecap="round" />
                <!-- subtle sparkles -->
                <circle cx="426" cy="56" r="4" fill="#60a5fa" opacity="0.65" />
                <circle cx="398" cy="36" r="3" fill="#a78bfa" opacity="0.65" />
                <circle cx="448" cy="92" r="3" fill="#fbbf24" opacity="0.6" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <!-- Stat cards row -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="s in stats"
          :key="s.label"
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div class="flex items-center gap-3 p-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl" :class="s.bg">
              <span class="text-base">{{ s.icon }}</span>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-semibold text-slate-500">{{ s.label }}</p>
              <p class="mt-0.5 text-xl font-bold text-slate-900">{{ s.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-6">
          <div id="skills" class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="flex items-start justify-between gap-4 border-b border-slate-100 p-4 sm:p-5">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Skills</h2>
                <p class="mt-1 text-sm text-slate-600">
                  Add skills recruiters can search for. Keep it focused on what you can demonstrate.
                </p>
              </div>
              <div class="rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                {{ mySkills.length }} skills
              </div>
            </div>

            <div class="p-4 sm:p-5">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div class="flex-1">
                  <BaseInput
                    v-model="skillInput"
                    name="skill"
                    label="Add a skill"
                    placeholder="e.g. Vue.js, SQL, Node.js"
                    @keydown.enter.prevent="addSkillQuick"
                  />
                </div>
                <BaseButton
                  size="sm"
                  class="sm:mb-1"
                  :loading="savingSkills"
                  @click="addSkillQuick"
                >
                  Add skill
                </BaseButton>
              </div>

              <div v-if="!mySkills.length" class="mt-4 text-sm text-slate-600">
                No skills yet. Add your first skill to improve discoverability in Explore.
              </div>
              <div v-else class="mt-4 flex flex-wrap gap-2">
                <BaseTag
                  v-for="s in mySkills"
                  :key="s"
                  removable
                  @remove="removeSkillQuick(s)"
                >
                  {{ s }}
                </BaseTag>
              </div>
            </div>
          </div>

          <div id="projects">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Projects</h2>
                <p class="text-sm text-slate-600">Showcase your best work so recruiters can review it fast.</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-sm font-semibold text-slate-700">Public</span>
                <BaseToggle
                  :model-value="studentStore.visibility"
                  label=""
                  @update:model-value="onVisibilityChange"
                />
              </div>
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
            <div v-else class="rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
              <div
                v-for="p in studentStore.projects"
                :key="p.id"
                class="flex items-center justify-between gap-4 p-4"
              >
                <div class="flex items-center gap-4 min-w-0">
                  <div class="h-12 w-12 shrink-0 rounded-xl bg-slate-100 ring-1 ring-slate-200" />
                  <div class="min-w-0">
                    <p class="truncate font-semibold text-slate-900">{{ p.title }}</p>
                    <p class="mt-1 line-clamp-1 text-sm text-slate-600">
                      {{ p.description || 'No description yet.' }}
                    </p>
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
        </div>

        <div id="messages" class="lg:col-span-1">
          <BaseCard>
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Inbox</h2>
                <p class="mt-1 text-sm text-slate-600">Messages from recruiters and partners.</p>
              </div>
            </div>

            <div v-if="studentStore.inboxLoading" class="flex justify-center py-10">
              <BaseSpinner />
            </div>

            <div v-else-if="!studentStore.inbox.length" class="mt-4">
              <BaseEmpty
                title="No messages yet"
                description="When recruiters message you from your public profile, you’ll see them here."
              />
            </div>

            <div v-else class="mt-4 grid gap-2">
              <button
                v-for="m in studentStore.inbox"
                :key="m.id"
                type="button"
                class="rounded-xl border px-3 py-3 text-left transition"
                :class="[
                  selectedMessageId === m.id ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50',
                  m.readAt ? '' : 'ring-1 ring-amber-200',
                ]"
                @click="openMessage(m)"
              >
                <div class="flex items-start justify-between gap-2">
                  <p class="truncate text-sm font-semibold text-slate-900">
                    {{ m.subject || 'New message' }}
                  </p>
                  <span v-if="!m.readAt" class="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                    New
                  </span>
                </div>
                <p class="mt-1 truncate text-xs text-slate-600">From {{ m.fromName }}</p>
                <p class="mt-2 line-clamp-2 text-xs text-slate-600">{{ m.body }}</p>
              </button>
            </div>

            <div v-if="selectedMessage" class="mt-6 border-t border-slate-200 pt-4">
              <p class="text-sm font-semibold text-slate-900">{{ selectedMessage.subject || 'Message' }}</p>
              <p class="mt-1 text-xs text-slate-600">
                From {{ selectedMessage.fromName }} ({{ selectedMessage.fromEmail }})
              </p>
              <p class="mt-3 whitespace-pre-wrap text-sm text-slate-700">{{ selectedMessage.body }}</p>
              <div class="mt-4 flex justify-end">
                <a
                  class="text-sm font-semibold text-blue-700 hover:underline"
                  :href="`mailto:${selectedMessage.fromEmail}?subject=${encodeURIComponent('Re: ' + (selectedMessage.subject || 'SkillsBridge message'))}`"
                >
                  Reply by email →
                </a>
              </div>
            </div>
          </BaseCard>
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

