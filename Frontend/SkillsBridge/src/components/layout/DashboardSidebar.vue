<template>
  <aside class="w-64 h-screen bg-gray-900 text-white flex flex-col">
    
    <!-- Logo -->
    <div class="p-4 text-xl font-bold border-b border-gray-700">
      Student Panel
    </div>

    <!-- Links -->
    <nav class="flex-1 p-4 space-y-2">
      <router-link
        to="/student"
        class="block px-3 py-2 rounded hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Dashboard
      </router-link>

      <router-link
        to="/student/profile"
        class="block px-3 py-2 rounded hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Profile
      </router-link>

      <router-link
        to="/student/projects"
        class="block px-3 py-2 rounded hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Projects
      </router-link>
    </nav>

    <!-- Logout -->
    <div class="p-4 border-t border-gray-700">
      <button
        @click="logout"
        class="w-full bg-red-600 py-2 rounded"
      >
        Logout
      </button>
    </div>

  </aside>
</template>

<script setup>
function logout() {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
</script>