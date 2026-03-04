<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { APP_NAME } from '../../utils/constants'
import BaseButton from '../base/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const menuOpen = ref(false)
const menuPanelRef = ref(null)
const hamburgerRef = ref(null)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const user = computed(() => authStore.user)

const MOBILE_BREAKPOINT = 768

function isMobileView() {
  return typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
}

function closeMenu() {
  menuOpen.value = false
}

function openMenu() {
  menuOpen.value = true
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'Home' })
  closeMenu()
}

function goDashboard() {
  router.push({ name: 'Dashboard' })
  closeMenu()
}

function goAdmin() {
  router.push({ name: 'Admin' })
  closeMenu()
}

function goExplore() {
  router.push({ name: 'Explore' })
  closeMenu()
}

function goHome() {
  router.push({ name: 'Home' })
  closeMenu()
}

function goAbout() {
  router.push({ name: 'About' })
  closeMenu()
}

function goLogin() {
  router.push({ name: 'Login' })
  closeMenu()
}

function goRegister() {
  router.push({ name: 'Register' })
  closeMenu()
}

// Focus first focusable in panel when menu opens; return focus to hamburger when closing (only if mobile)
watch(menuOpen, (open) => {
  if (open) {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const firstFocusable = menuPanelRef.value?.querySelector(
          'button:not([tabindex="-1"]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (firstFocusable) {
          firstFocusable.focus()
        }
      })
    })
  } else {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
    if (isMobileView() && hamburgerRef.value) {
      hamburgerRef.value.focus()
    }
  }
})

function onKeydown(e) {
  if (!menuOpen.value) return
  if (e.key === 'Escape') {
    closeMenu()
  }
}

function onResize() {
  if (window.innerWidth >= MOBILE_BREAKPOINT && menuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/5 backdrop-blur" role="banner">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <router-link
        to="/"
        class="flex items-center gap-2 font-semibold text-academic-navy focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
      >
        <span>
          <img src="/public/SkillsBridge Logo.jpeg" class="h-14 w-14" alt="SkillsBridge logo"/>
        </span>
      </router-link>

      <!-- Desktop nav: visible from md (768px) up; hidden on small screens -->
      <nav
        class="max-md:hidden flex items-center gap-4"
        aria-label="Main navigation"
      >
        <button
          type="button"
          class="text-sm font-medium text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
          @click="goHome"
        >
          Home
        </button>
        <button
          type="button"
          class="text-sm font-medium text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
          @click="goExplore"
        >
          Explore
        </button>
        <button
          type="button"
          class="text-sm font-medium text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
          @click="goAbout"
        >
          About
        </button>

        <template v-if="isAuthenticated">
          <button
            v-if="isAdmin"
            type="button"
            class="text-sm font-medium text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
            @click="goAdmin"
          >
            Admin
          </button>
          <button
            v-else
            type="button"
            class="text-sm font-medium text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
            @click="goDashboard"
          >
            Dashboard
          </button>
          <span class="text-sm text-slate-500 px-2">{{ user?.fullName || user?.email }}</span>
          <BaseButton variant="ghost" size="sm" @click="handleLogout">Logout</BaseButton>
        </template>
        <template v-else>
          <BaseButton variant="ghost" size="sm" @click="goLogin">
            LogIn
          </BaseButton>
          <BaseButton size="sm" @click="goRegister">
            Sign up
          </BaseButton>
        </template>
      </nav>

      <!-- Hamburger: visible only below md (768px) -->
      <button
        ref="hamburgerRef"
        type="button"
        class="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shrink-0"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        aria-controls="mobile-menu"
        @click="toggleMenu"
      >
        <span class="sr-only">{{ menuOpen ? 'Close menu' : 'Open menu' }}</span>
        <span
          class="block w-6 h-0.5 bg-current rounded transition-all duration-200 ease-out origin-center"
          :class="menuOpen ? 'rotate-45 translate-y-1' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-current rounded transition-all duration-200 ease-out mt-1"
          :class="menuOpen ? 'opacity-0 scale-x-0' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-current rounded transition-all duration-200 ease-out mt-1 origin-center"
          :class="menuOpen ? '-rotate-45 -translate-y-1.5' : ''"
        />
      </button>
    </div>

    <!-- Mobile menu: only rendered / visible below md -->
    <div
      id="mobile-menu"
      ref="menuPanelRef"
      class="md:hidden fixed inset-0 top-16 z-30"
      :class="menuOpen ? 'visible' : 'invisible'"
      aria-label="Mobile navigation"
      :aria-hidden="!menuOpen"
      role="dialog"
      aria-modal="true"
    >
      <!-- Overlay -->
      <button
        type="button"
        class="absolute inset-0 bg-slate-900/50 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        :class="menuOpen ? 'opacity-100' : 'opacity-0'"
        aria-label="Close menu"
        tabindex="-1"
        @click="closeMenu"
      />

      <!-- Slide-in panel -->
      <div
        class="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl flex flex-col transition-transform duration-300 ease-out"
        :class="menuOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="flex items-center justify-between p-4 border-b border-slate-200 shrink-0">
          <span class="text-sm font-medium text-slate-500">Menu</span>
          <button
            type="button"
            class="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close menu"
            @click="closeMenu"
          >
            <span class="sr-only">Close</span>
            <span aria-hidden="true" class="text-xl leading-none">&times;</span>
          </button>
        </div>
        <nav class="flex flex-col p-4 gap-1 overflow-y-auto min-h-0" aria-label="Main navigation">
          <button
            type="button"
            class="text-left text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
            @click="goHome"
          >
            Home
          </button>
          <button
            type="button"
            class="text-left text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
            @click="goExplore"
          >
            Explore
          </button>
          <button
            type="button"
            class="text-left text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
            @click="goAbout"
          >
            About
          </button>

          <template v-if="isAuthenticated">
            <button
              v-if="isAdmin"
              type="button"
              class="text-left text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
              @click="goAdmin"
            >
              Admin
            </button>
            <button
              v-else
              type="button"
              class="text-left text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
              @click="goDashboard"
            >
              Dashboard
            </button>
            <p class="px-4 py-2 text-sm text-slate-500 border-t border-slate-200 mt-2 pt-3">
              {{ user?.fullName || user?.email }}
            </p>
            <BaseButton
              variant="ghost"
              class="w-full justify-center mt-2"
              @click="handleLogout"
            >
              Logout
            </BaseButton>
          </template>
          <template v-else>
            <div class="border-t border-slate-200 mt-2 pt-3 flex flex-col gap-2">
              <BaseButton variant="ghost" class="w-full justify-center" @click="goLogin">
                Log in
              </BaseButton>
              <BaseButton class="w-full justify-center" @click="goRegister">
                Sign up
              </BaseButton>
            </div>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>
