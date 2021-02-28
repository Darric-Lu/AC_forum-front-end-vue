<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <Users v-for="user in users" :key="user.id" :initial-user="user" />
    </div>
  </div>
</template>


<script>
import NavTabs from "../components/NavTabs";
import Users from "../components/Users";
import getUserTopAPI from "../apis/userTop";
import { Toast } from "../utils/helpers";

export default {
  name: "uesrs",
  components: {
    NavTabs,
    Users,
  },
  data() {
    return {
      users: [],
      presetImage:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await getUserTopAPI.getUserTop();
        this.users = data.users;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法接收美食達人的名次，請稍後再試",
        });
      }
    },
  },
};
</script>