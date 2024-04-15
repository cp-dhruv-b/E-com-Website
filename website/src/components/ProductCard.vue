<template>
    <div class="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
      <img :src="product.imageUrl" :alt="product.name" class="w-full h-56 object-cover object-center">
      <div class="p-4">
        <h2 class="text-gray-900 font-bold text-lg">{{ product.name }}</h2>
        <p class="mt-2 text-gray-600">{{ product.description }}</p>
        <div class="flex justify-between items-center mt-4">
          <span class="text-gray-700 font-bold">{{ product.price }}</span>
          <button @click="toggleFavorite" :class="{ 'text-red-500': isFavorite }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6l-2 2-2-2M5 12h14"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      },
      isFavorite: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toggleFavorite() {
        this.$emit('toggle-favorite', this.product.id);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  