<script setup>
import { useRouter } from 'vue-router'
import { APP_NAME } from '../../utils/constants'

const router = useRouter()

function go(path) {
  router.push(path)
}
</script>

<template>
  <footer class="border-t border-slate-200 bg-slate-900 text-slate-300">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-2 lg:col-span-1">
          <span class="text-lg font-semibold text-white">{{ APP_NAME }}</span>
          <p class="mt-2 text-sm">
            The student skills portfolio platform. Showcase your work, get discovered by explorers.
          </p>
        </div>
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Product</h3>
          <ul class="mt-4 space-y-2">
            <li>
              <button type="button" class="text-sm hover:text-white transition-colors" @click="go('/explore')">
                Explore students
              </button>
            </li>
            <li>
              <button type="button" class="text-sm hover:text-white transition-colors" @click="go('/register')">
                Sign up
              </button>
            </li>
            <li>
              <button type="button" class="text-sm hover:text-white transition-colors" @click="go('/login')">
                LogIn
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
          <ul class="mt-4 space-y-2">
            <li>
              <button type="button" class="text-sm hover:text-white transition-colors" @click="go('/')">
                Home
              </button>
            </li>
            <li>
              <button type="button" class="text-sm hover:text-white transition-colors" @click="go('/about')">
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                class="text-sm hover:text-white transition-colors"
                @click="router.push({ path: '/', hash: '#how-it-works' })"
              >
                How it works
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 sm:flex-row">
        <p class="text-sm text-slate-500">
          &copy; {{ new Date().getFullYear() }} {{ APP_NAME }}. All rights reserved.
        </p>
        <div class="flex gap-6 text-sm text-slate-500">
          <a href="#" class="hover:text-slate-300 transition-colors">Privacy</a>
          <a href="#" class="hover:text-slate-300 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</template>
