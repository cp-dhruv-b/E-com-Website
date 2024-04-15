<template>
    <div>
      <Navbar />
      <Slider />
      <div class="container mx-auto px-4 mt-8">
        <h2 class="text-2xl font-semibold mb-4">Featured Products</h2>
        <ProductList />
      </div>
      <Footer />
      <Cart />
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue'
  import Slider from '../components/Slider.vue'
  import ProductList from '../components/ProductList.vue'
  import Footer from '../components/Footer.vue'
  import Cart from '../components/Cart.vue'
  
  export default {
    components: {
      Navbar,
      Slider,
      ProductList,
      Footer,
      Cart
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  