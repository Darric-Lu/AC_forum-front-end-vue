<template>
  <div class="container py-5">
    <AdminRestaurantForm
      @after-submit="handleAfterSubmit"
      :is-processing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  name: "AdminRestaurantNew",
  data() {
    return {
      isProcessing: false,
    };
  },
  components: {
    AdminRestaurantForm,
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurant.create({ formData });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.$router.push({ name: "admin-restaurants" });
      } catch (erorr) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法送出新增資料，請稍後再試",
        });
      }
    },
  },
};
</script>