<script setup>
import { computed, onMounted, ref } from 'vue'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseEmpty from '../components/base/BaseEmpty.vue'
import BaseSpinner from '../components/base/BaseSpinner.vue'
import { useStudentStore } from '../stores/studentStore'
import { useToast } from '../composables/useToast'

const studentStore = useStudentStore()
const toast = useToast()
const selectedMessageId = ref('')

const selectedMessage = computed(() => {
  return studentStore.inbox.find((m) => m.id === selectedMessageId.value) || null
})

onMounted(async () => {
  try {
    await studentStore.fetchInbox({ limit: 50 })
  } catch {
    toast.error('Failed to load messages')
  }
})

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
    <div class="mx-auto max-w-6xl space-y-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Messages</h1>
        <p class="mt-1 text-slate-600">Recruiter and partner messages sent from your public profile.</p>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <BaseCard class="lg:col-span-1">
          <h2 class="text-sm font-semibold text-slate-900">Inbox</h2>

          <div v-if="studentStore.inboxLoading" class="flex justify-center py-10">
            <BaseSpinner />
          </div>

          <div v-else-if="!studentStore.inbox.length" class="mt-4">
            <BaseEmpty title="No messages yet" description="When recruiters message you, you’ll see them here." />
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
                <p class="truncate text-sm font-semibold text-slate-900">{{ m.subject || 'New message' }}</p>
                <span
                  v-if="!m.readAt"
                  class="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800"
                >
                  New
                </span>
              </div>
              <p class="mt-1 truncate text-xs text-slate-600">From {{ m.fromName }}</p>
              <p class="mt-2 line-clamp-2 text-xs text-slate-600">{{ m.body }}</p>
            </button>
          </div>
        </BaseCard>

        <BaseCard class="lg:col-span-2">
          <h2 class="text-sm font-semibold text-slate-900">Message</h2>
          <div v-if="!selectedMessage" class="mt-4">
            <BaseEmpty title="Select a message" description="Choose a message from your inbox to read it here." />
          </div>
          <div v-else class="mt-4">
            <p class="text-lg font-semibold text-slate-900">{{ selectedMessage.subject || 'Message' }}</p>
            <p class="mt-1 text-sm text-slate-600">
              From {{ selectedMessage.fromName }} ({{ selectedMessage.fromEmail }})
            </p>
            <p class="mt-4 whitespace-pre-wrap text-slate-700">{{ selectedMessage.body }}</p>
            <div class="mt-6 flex justify-end">
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
  </DashboardLayout>
</template>

