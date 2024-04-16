<template>
  <div class="cart bg-white shadow-md rounded px-8 py-6">
    <h2 class="text-lg font-semibold mb-4">Your Cart</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        class="cart-item flex items-center justify-between border-b pb-2 mb-2"
      >
        <div class="item-details">
          <p class="font-semibold">{{ item.name }}</p>
          <p class="text-gray-600">Price: ${{ item.price.toFixed(2) }}</p>
          <!-- Add more details like quantity, total price, etc. -->
        </div>
        <button
          @click="removeFromCart(index)"
          class="remove-btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Remove
        </button>
      </div>
      <div class="cart-total mt-4">
        <p class="font-semibold">Total: ${{ calculateTotal().toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
    };
  },
  methods: {
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    calculateTotal() {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    },
  },
};
</script>

<style scoped></style>
