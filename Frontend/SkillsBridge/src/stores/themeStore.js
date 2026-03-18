import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const THEME_KEY = 'skillsbridge_theme'

function applyTheme(isDark) {
  const root = document.documentElement
  root.classList.remove('dark')
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function hydrate() {
    // SkillsBridge: light theme only
    isDark.value = false
    applyTheme(false)
    localStorage.setItem(THEME_KEY, 'light')
  }

  function setDark(next) {
    // Disabled (light theme only)
    isDark.value = false
    applyTheme(false)
    localStorage.setItem(THEME_KEY, 'light')
  }

  function resetToLight() {
    isDark.value = false
    applyTheme(false)
    localStorage.setItem(THEME_KEY, 'light')
  }

  watch(isDark, (v) => {
    applyTheme(false)
    localStorage.setItem(THEME_KEY, 'light')
  })

  return { isDark, hydrate, setDark, resetToLight }
})

