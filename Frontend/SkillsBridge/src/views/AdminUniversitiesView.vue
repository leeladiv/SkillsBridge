<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseModal from '../components/base/BaseModal.vue'
import { useAdminStore } from '../stores/adminStore'
import { useUniversityStore } from '../stores/universityStore'
import { useToast } from '../composables/useToast'

const adminStore = useAdminStore()
const universityStore = useUniversityStore()
const toast = useToast()
const showAddModal = ref(false)
const newUniversityName = ref('')
const adding = ref(false)

onMounted(async () => {
  await universityStore.fetchUniversities()
  await adminStore.fetchUniversityRequests()
})

async function addUniversity() {
  if (!newUniversityName.value.trim()) return
  adding.value = true
  try {
    await adminStore.addUniversity({ name: newUniversityName.value.trim() })
    toast.success(`"${newUniversityName.value.trim()}" added successfully`)
    showAddModal.value = false
    newUniversityName.value = ''
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to add university')
  } finally {
    adding.value = false
  }
}

async function handleApprove(requestId) {
  try {
    await adminStore.approveUniversity(requestId)
    toast.success('University approved')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to approve')
  }
}

async function handleReject(requestId) {
  try {
    await adminStore.rejectUniversity(requestId)
    toast.success('Request rejected')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to reject')
  }
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-slate-900">Manage universities</h1>
        <BaseButton @click="showAddModal = true">Add university</BaseButton>
      </div>

      <BaseCard padding="lg">
        <h2 class="text-lg font-semibold text-slate-900">Pending requests</h2>
        <p class="mt-1 text-sm text-slate-600">Approve or reject requests to add new universities.</p>
        <div v-if="adminStore.requests?.length" class="mt-4 space-y-2">
          <div
            v-for="r in adminStore.requests"
            :key="r.id"
            class="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
          >
            <div class="flex-1 min-w-0">
              <span class="font-medium">{{ r.requestedName || r.universityName }}</span>
              <span v-if="r.requesterEmail" class="ml-2 text-sm text-slate-500">{{ r.requesterEmail }}</span>
            </div>
            <div class="flex gap-2 ml-4">
              <BaseButton size="sm" @click="handleApprove(r.id)">Approve</BaseButton>
              <BaseButton variant="danger" size="sm" @click="handleReject(r.id)">Reject</BaseButton>
            </div>
          </div>
        </div>
        <p v-else class="mt-4 text-sm text-slate-500">No pending requests.</p>
      </BaseCard>

      <BaseCard padding="lg">
        <h2 class="text-lg font-semibold text-slate-900">Approved universities</h2>
        <p class="mt-1 text-sm text-slate-600">Available in the registration dropdown.</p>
        <ul class="mt-4 divide-y divide-slate-200">
          <li v-for="u in universityStore.universities" :key="u.id" class="py-2 text-slate-700">
            {{ u.name }}
          </li>
        </ul>
        <p v-if="!universityStore.universities.length" class="mt-4 text-sm text-slate-500">No universities yet. Add one or approve requests.</p>
      </BaseCard>
    </div>

    <BaseModal :show="showAddModal" title="Add university" @close="showAddModal = false">
      <BaseInput v-model="newUniversityName" label="University name" placeholder="University Name" />
      <div class="mt-4 flex justify-end gap-2">
        <BaseButton variant="secondary" @click="showAddModal = false">Cancel</BaseButton>
        <BaseButton :loading="adding" @click="addUniversity">Add</BaseButton>
      </div>
    </BaseModal>
  </AdminLayout>
</template>
