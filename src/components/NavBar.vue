<template>
  <header class="sticky top-0 bg-gray-50 shadow">
    <nav class="container bg-gray-50 mx-auto flex items-center justify-between p-4">
      <div class="flex items-center space-x-4 w-9/12 sm:w-2/3 md:w-2/3 lg:w-1/2">
        <RouterLink to="/" draggable="false" class="text-xl font-bold">FaceBlog</RouterLink>
        <form class="w-full">
          <div class="relative">
            <input
              type="text"
              placeholder="Search for Profiles"
              class="w-full border bg-white rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300">
            <button type="submit" class="absolute right-2 top-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                   class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </button>
          </div>
        </form>
      </div>

      <button class="lg:hidden text-gray-700 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <div class="hidden lg:flex space-x-4 items-center">
        <RouterLink to="#" draggable="false" class="flex items-center space-x-2">
          <img src="" class="w-7 h-7 rounded-full" alt="Profile Picture">
          <span>Username</span>
        </RouterLink>
        <RouterLink to="/login/" draggable="false" class="text-green-600 flex items-center space-x-1">
          <bell-icon class="w-6 h-6"/>
          <span>Notifications</span>
        </RouterLink>
        <RouterLink to="#" draggable="false" class="text-green-600 flex items-center space-x-1">
          <plus-circle-icon class="w-6 h-6"/>
          <span>New Post</span>
        </RouterLink>
        <button @click="logout" class="text-red-600 flex items-center space-x-1 cursor-pointer">
          <arrow-left-start-on-rectangle-icon class="w-6 h-6"/>
          <span>Log Out</span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { BellIcon, ArrowLeftStartOnRectangleIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import useUserStore from '@/stores/user.js'
import { useRouter } from 'vue-router'

const router = useRouter();
const store = useUserStore();
const logout = () => {
  store.logout();
  router.push('/login');
}
</script>
