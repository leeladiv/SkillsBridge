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
  <header
    class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur"
    role="banner"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-6">
      <router-link
        to="/"
        class="ml-2 sm:ml-4 flex items-center gap-3 font-semibold text-academic-navy focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
      >
        <img
          src="/public/SkillsBridge Logo1.png"
          class="h-12 w-12 rounded-md"
          alt="SkillsBridge logo"
        />
      </router-link>

      <!-- Desktop nav: visible from md (768px) up; hidden on small screens -->
      <nav
        class="max-md:hidden flex-1 flex items-center justify-center gap-6 text-sm font-medium text-slate-600"
        aria-label="Main navigation"
      >
        <button
  type="button"
  class="text-sm font-medium text-slate-600 rounded px-2 py-1
         hover:text-white hover:bg-blue-600
         cursor-pointer
         transition-colors duration-300
         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  @click="goHome"
>
  Home
</button>

<button
  type="button"
  class="text-sm font-medium text-slate-600 rounded px-2 py-1
         hover:text-white hover:bg-blue-600
         cursor-pointer
         transition-colors duration-300
         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  @click="goExplore"
>
  Explore
</button>
<button
  type="button"
  class="text-sm font-medium text-slate-600 rounded px-2 py-1
         hover:text-white hover:bg-blue-600
         cursor-pointer
         transition-colors duration-300
         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  @click="goAbout"
>
  About
</button>      </nav>

      <!-- Desktop auth actions -->
      <div class="max-md:hidden flex items-center gap-3">
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
          <span class="text-sm text-slate-500 px-1">
            {{ user?.fullName || user?.email }}
          </span>
          <BaseButton variant="ghost" size="sm" @click="handleLogout">
            Logout
          </BaseButton>
        </template>
        <template v-else>
          <BaseButton variant="ghost" size="sm" @click="goLogin">
            LogIn
          </BaseButton>
          <BaseButton size="sm" @click="goRegister">
            Sign up
          </BaseButton>
        </template>
      </div>

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

    <!-- Mobile menu: simple dropdown under header on small screens -->
    <div
      id="mobile-menu"
      ref="menuPanelRef"
      class="md:hidden border-b border-slate-200 bg-white"
      v-if="menuOpen"
      aria-label="Mobile navigation"
    >
      <nav class="flex flex-col px-4 pb-4 pt-2 gap-1" aria-label="Main navigation">
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
  </header>
</template>
