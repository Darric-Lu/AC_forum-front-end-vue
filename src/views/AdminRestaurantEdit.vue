<template>
  <div class="container py-5">
    <AdminRestaurantForm
      @after-submit="handleAfterSubmit"
      :initial-restaurant="restaurant"
      :is-processing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm.vue";
import adminAPI from "./../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  name: "AdminRestaurantEdit",
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
      isProcessing: false,
    };
  },
  components: {
    AdminRestaurantForm,
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurant.update({
          restaurantId: this.restaurant.id,
          formData,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法更新餐廳資料，請稍後再試",
        });
      }
    },
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurant.getDetail({ restaurantId });
        const { id, name, tel, address, description, image } = data.restaurant;
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          categoryId: data.restaurant.CategoryId,
          tel,
          address,
          description,
          image,
          openingHours: data.restaurant.opening_hours,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料",
        });
      }
    },
  },
};
</script>