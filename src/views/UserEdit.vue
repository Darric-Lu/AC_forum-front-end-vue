<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="user.name"
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="user.image"
          :src="user.image"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
        />
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        />
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isProcessing">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "UserEdit",
  data() {
    return {
      user: {
        id: -1,
        name: "",
        image: "",
      },
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.setUser();
  },
  watch: {
    currentUser() {
      this.setUser();
      const { id } = this.$route.params;
      this.user.id = id;
      if (Number(id) !== Number(this.currentUser.id)) {
        this.$router.push({ name: "not-found" });
      }
    },
  },
  methods: {
    setUser() {
      this.user.name = this.currentUser.name;
      this.user.image = this.currentUser.image;
      this.user.id = this.currentUser.id;
    },
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.restaurant.image = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.image = imageURL;
      }
    },
    async handleSubmit(e) {
      const form = e.target; // <form></form>
      const formData = new FormData(form);
      if (!this.user.name.trim()) {
        Toast.fire({
          title: "Name 請正確填寫",
          icon: "error",
        });
      } else {
        this.isProcessing = true;
        try {
          const id = this.user.id;
          console.log("handleSubmit", id);
          const { data } = await userAPI.update({ userId: id, formData });
          console.log("response", data);
          this.$router.push({ name: "user", params: { id } });
        } catch (error) {
          Toast.fire({
            title: "無法更新請稍後再試",
            icon: "error",
          });
        }
      }
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
  },
};
</script>