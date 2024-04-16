<template>
  <div class="container mx-auto px-4 mt-8">
    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 px-4">
        <img :src="product.photo" :alt="product.name" class="w-full h-auto mb-4" />
      </div>
      <div class="w-full md:w-1/2 px-4">
        <h2 class="text-2xl font-semibold mb-2">{{ product.name }}</h2>
        <p class="text-gray-600 text-lg mb-4">{{ product.description }}</p>
        <p class="text-gray-700">
          <b>Category:</b> {{ getCategoryName(product.categoryId) }}
        </p>
        <p class="text-gray-700">
          <b>Subcategory:</b> {{ getSubcategoryName(product.subcategoryId) }}
        </p>
        <p class="text-gray-800 font-semibold text-xl m-2">${{ product.price }}</p>

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="addToCart(product)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ApiRequest } from "../api/api.js";

export default {
  setup() {
    const router = useRouter();
    const product = ref(null);
    const categories = ref([]);

    const fetchProductDetails = async () => {
      try {
        const productId = router.currentRoute.value.params.id;
        const productData = await ApiRequest("get", `product/${productId}`);
        product.value = productData;
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await ApiRequest("get", "category", null, token);
        categories.value = data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const getCategoryName = (categoryId) => {
      const category = categories.value.find((cat) => cat.id === categoryId);
      return category ? category.name : "";
    };

    const getSubcategoryName = (subcategoryId) => {
      const subcategory = categories.value.find((cat) => cat.id === subcategoryId);
      return subcategory ? subcategory.name : "";
    };

    const addToCart = async (product) => {
      // Implement your logic to add the product to the cart
      console.log("Adding product to cart:", product);
    };

    onMounted(() => {
      fetchProductDetails();
      fetchCategories();
    });

    return {
      product,
      addToCart,
      getCategoryName,
      getSubcategoryName,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles for ProductDetails.vue here */
</style>
