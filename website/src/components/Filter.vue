<template>
  <div class="container mx-auto px-4 mt-8">
    <div class="flex justify-center">
      <select v-model="selectedCategory" @change="filterSubcategories" class="mr-4">
        <option value="">All Categories</option>
        <option
          v-for="category in filteredCategories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <select
        v-model="selectedSubcategory"
        v-if="selectedCategory"
        @change="filterProducts"
      >
        <option value="">All Subcategories</option>
        <option
          v-for="subcategory in filteredSubcategories"
          :key="subcategory.id"
          :value="subcategory.id"
        >
          {{ subcategory.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { ApiRequest } from "../api/api.js";

export default {
  setup() {
    const selectedCategory = ref("");
    const selectedSubcategory = ref("");
    const categories = ref([]);
    const subcategories = ref([]);

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const categoriesData = await ApiRequest("get", "category", null, token);
        categories.value = categoriesData;
        // Fetch subcategories for each category
        const categoriesWithSubcategories = categoriesData.filter(
          (cat) => cat.parentId !== null
        );
        const subcategoriesPromises = categoriesWithSubcategories.map((cat) =>
          ApiRequest("get", `category/${cat.id}/subcategories`, null, token)
        );
        const subcategoriesResults = await Promise.all(subcategoriesPromises);

        categoriesWithSubcategories.forEach((cat, index) => {
          cat.subcategories = subcategoriesResults[index];
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const filterSubcategories = () => {
      const categoryId = selectedCategory.value;
      if (!categoryId) {
        subcategories.value = [];
        selectedSubcategory.value = "";
        return;
      }
      const selectedCategoryObj = categories.value.find(
        (category) => category.id === categoryId
      );
      if (selectedCategoryObj) {
        subcategories.value = selectedCategoryObj.subcategories || [];
      } else {
        subcategories.value = [];
      }
    };

    const filterProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await ApiRequest(
          "get",
          `productfilter?category=${selectedCategory.value}&subcategory=${selectedSubcategory.value}`,
          null,
          token
        );
        console.log(response);
      } catch (error) {
        console.error("Error filtering products:", error);
      }
    };

    const filteredCategories = computed(() => {
      return categories.value.filter((category) => !category.parentId);
    });

    const filteredSubcategories = computed(() => {
      if (!selectedCategory.value) return [];
      return subcategories.value.filter(
        (subcategory) => subcategory.parentId === selectedCategory.value
      );
    });

    fetchCategories();

    return {
      selectedCategory,
      selectedSubcategory,
      categories,
      subcategories,
      filterSubcategories,
      filterProducts,
      filteredCategories,
      filteredSubcategories,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles for Filter.vue here */
</style>
