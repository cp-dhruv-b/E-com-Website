<template>
  <h2 class="text-2xl font-semibold m-4">Featured Products</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-3">
    <router-link
      v-for="product in products"
      :key="product.id"
      :to="{ name: 'ProductDetails', params: { id: product.id } }"
    >
      <ProductCard
        :product="product"
        :isFavorite="isFavorite(product.id)"
        @toggle-favorite="toggleFavorite"
      />
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProductCard from "./ProductCard.vue";
import { ApiRequest } from "../api/api.js";

export default {
  components: {
    ProductCard,
  },
  setup() {
    const router = useRouter();
    const products = ref([]);
    const favorites = ref([]);

    const fetchProducts = async () => {
      try {
        const productsData = await ApiRequest("get", "product");
        products.value = productsData;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const favoritesData = await ApiRequest("get", "favorites", null, token);
        favorites.value = favoritesData;
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    const isFavorite = (productId) => {
      return favorites.value.some((favorite) => favorite.productId === productId);
    };

    const toggleFavorite = async (productId) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const isFavoriteValue = isFavorite(productId);
        const method = isFavoriteValue ? "delete" : "post";
        const endpoint = `product/${productId}/favorite`;

        await ApiRequest(method, endpoint, null, token);
        isFavoriteValue ? removeFromFavorites(productId) : addToFavorites(productId);
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    };

    const addToFavorites = (productId) => {
      favorites.value.push({ productId });
    };

    const removeFromFavorites = (productId) => {
      favorites.value = favorites.value.filter(
        (favorite) => favorite.productId !== productId
      );
    };

    return {
      products,
      favorites,
      fetchProducts,
      fetchFavorites,
      isFavorite,
      toggleFavorite,
    };
  },
  mounted() {
    this.fetchProducts();
    this.fetchFavorites();
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
