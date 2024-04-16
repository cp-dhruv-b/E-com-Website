<template>
  <div>
    <Navbar />
    <Slider />
    <div class="container mx-auto px-4 mt-8">
      <Filter @filter="handleFilter" />
      <ProductList :products="filteredProducts" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Slider from "../components/Slider.vue";
import ProductList from "../components/ProductList.vue";
import Footer from "../components/Footer.vue";
import Cart from "../components/Cart.vue";
import Filter from "../components/Filter.vue";

export default {
  components: {
    Navbar,
    Slider,
    ProductList,
    Footer,
    Cart,
    Filter,
  },
  data() {
    return {
      filteredProducts: [],
    };
  },
  methods: {
    handleFilter(selectedCategory, selectedSubcategory) {
      // Implement logic to filter products based on selected category and subcategory
      // You can use API calls or filter products from existing data
      // Assign filtered products to this.filteredProducts
    },
  },
};
</script>

<style scoped></style>
