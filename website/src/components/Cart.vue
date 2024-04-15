<template>
    <div class="cart">
      <h2 class="cart-heading">Your Cart</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <div class="item-details">
            <p>{{ item.name }}</p>
            <p>{{ item.price }}</p>
            <!-- Add more details like quantity, total price, etc. -->
          </div>
          <button @click="removeFromCart(index)" class="remove-btn">Remove</button>
        </div>
        <div class="cart-total">
          <p>Total: {{ calculateTotal() }}</p>
          <!-- Add checkout button or continue shopping link -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [], // Array to store cart items
      };
    },
    methods: {
      removeFromCart(index) {
        this.cartItems.splice(index, 1); // Remove item from cart
      },
      calculateTotal() {
        // Calculate total price of items in cart
        return this.cartItems.reduce((total, item) => total + item.price, 0);
      },
    },
  };
  </script>
  
  <style scoped>
  .cart {
    /* Add cart styles here */
  }
  
  .cart-heading {
    /* Add heading styles here */
  }
  
  .empty-cart {
    /* Add empty cart styles here */
  }
  
  .cart-item {
    /* Add cart item styles here */
  }
  
  .item-details {
    /* Add item details styles here */
  }
  
  .remove-btn {
    /* Add remove button styles here */
  }
  
  .cart-total {
    /* Add cart total styles here */
  }
  </style>
  