<template>
    <nav class="bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <router-link to="/" class="text-white text-xl font-bold">E-com Admin Panel</router-link>
  
          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-4">
            <router-link to="/dashboard" class="text-gray-300 hover:text-white">Dashboard</router-link>
            <router-link to="/categories" class="text-gray-300 hover:text-white">Categories</router-link>
            <router-link to="/products" class="text-gray-300 hover:text-white">Products</router-link>
            <router-link to="/users" class="text-gray-300 hover:text-white">Users</router-link>
          </div>
  
          <!-- Hamburger Menu (Mobile) -->
          <div class="md:hidden">
            <button @click="toggleMenu" class="text-gray-300 hover:text-white focus:outline-none">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mobile Menu -->
      <div class="md:hidden" v-if="isMenuOpen">
        <div class="px-2 pb-3">
          <router-link to="/dashboard" class="block text-gray-300 hover:text-white py-2">Dashboard</router-link>
          <router-link to="/categories" class="block text-gray-300 hover:text-white py-2">Categories</router-link>
          <router-link to="/products" class="block text-gray-300 hover:text-white py-2">Products</router-link>
          <router-link to="/users" class="block text-gray-300 hover:text-white py-2">Users</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      }
    }
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  