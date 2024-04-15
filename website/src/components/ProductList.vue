<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :isFavorite="isFavorite(product.id)"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { ApiRequest } from '../api/api.js';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      favorites: []
    }
  },
  created() {
    this.fetchProducts();
    this.fetchFavorites();
  },
  methods: {
    async fetchProducts() {
      try {
        const products = await ApiRequest('get', 'product');
        this.products = products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchFavorites() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const favorites = await ApiRequest('get', 'favorites', null, token);
        this.favorites = favorites;
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    },
    isFavorite(productId) {
      return this.favorites.some(favorite => favorite.productId === productId);
    },
    async toggleFavorite(productId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const isFavorite = this.isFavorite(productId);
        const method = isFavorite ? 'delete' : 'post';
        const endpoint = `product/${productId}/favorite`;

        await ApiRequest(method, endpoint, null, token);
        isFavorite ? this.removeFromFavorites(productId) : this.addToFavorites(productId);
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    },
    addToFavorites(productId) {
      this.favorites.push({ productId });
    },
    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter(favorite => favorite.productId !== productId);
    }
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
