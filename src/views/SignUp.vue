<template>
  <div class="container py-5">
    <form class="w-100" @submit.stop.prevent="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          v-model="name"
          id="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          v-model="passwordCheck"
          id="password-check"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        {{ isProcessing ? "處理中..." : "Submit" }}
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin"> Sign In </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>
<script>
import { Toast } from "../utils/helpers";
import signUpAPI from "../apis/signUp";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit(e) {
      if (!this.name) {
        Toast.fire({
          icon: "error",
          title: "請填寫Name",
        });
        return;
      } else if (!this.email) {
        Toast.fire({
          icon: "error",
          title: "請填寫Email",
        });
        return;
      } else if (
        !this.password ||
        !this.passwordCheck ||
        this.password !== this.passwordCheck
      ) {
        Toast.fire({
          icon: "error",
          title: "請填寫再確認密碼",
        });
        return;
      }
      const form = e.target;

      const formData = new FormData(form);
      formData;
      try {
        this.isProcessing = true;
        const { data } = await signUpAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.$router.push({ name: "sign-in" });
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          icon: "error",
          title: "目前無法註冊，請稍後再試",
        });
      }
    },
  },
};
</script>