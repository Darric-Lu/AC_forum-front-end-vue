<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row text-center">
        <Users v-for="user in users" :key="user.id" :initial-user="user" />
      </div>
    </template>
  </div>
</template>


<script>
import NavTabs from "../components/NavTabs";
import Users from "../components/Users";
import usersAPI from "../apis/users";
import Spinner from "../components/Spinner";
import { Toast } from "../utils/helpers";

export default {
  name: "uesrs",
  components: {
    NavTabs,
    Users,
    Spinner,
  },
  data() {
    return {
      users: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await usersAPI.getUserTop();

        if (data.length === 0) {
          throw new Error(data.message);
        }

        this.users = data.users;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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