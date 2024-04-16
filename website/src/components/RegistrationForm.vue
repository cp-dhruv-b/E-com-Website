<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full px-6">
      <h1 class="text-3xl font-bold mb-8 text-center">Register</h1>
      <form class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Name
          </label>
          <input
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            @click.prevent="registerUser"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign Up
          </button>
        </div>
        <p class="text-center mt-4">
          Already have an account?
          <router-link to="/" class="text-blue-500 hover:underline"
            >Login Here</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ApiRequest } from "../api/api.js";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      if (!this.username) {
        alert("Please enter your name.");
        return;
      }

      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!this.email.match(emailRegex)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!this.password) {
        alert("Please enter a password.");
        return;
      }

      try {
        const response = await ApiRequest("post", "signup", {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        if (response && response.data) {
          localStorage.setItem("token", response.data.token);
        } else {
          console.error("Unexpected response:", response);
        }

        this.username = "";
        this.email = "";
        this.password = "";

        this.$router.push("/home");
      } catch (error) {
        if (error.response && error.response.data) {
          alert("Email is already registered. Please login or use a different email.");
          console.error("Error registering user", error.response.data);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .max-w-md {
    max-width: 90%;
  }
}
</style>
