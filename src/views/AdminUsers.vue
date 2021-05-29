<template>
  <div class="container py-5">
    <AdminNav />
    <!-- AdminNav Component -->
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>
            <span v-if="user.isAdmin">admin</span>
            <span v-else>user</span>
          </td>
          <td>
            <div v-if="!user.mainAdmin">
              <button
                @click.stop.prevent="toggleUserRole(user.id)"
                v-if="user.isAdmin"
                type="button"
                class="btn btn-link"
              >
                set as user
              </button>
              <button
                @click.stop.prevent="toggleUserRole(user.id)"
                v-else
                type="button"
                class="btn btn-link"
              >
                set as admin
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Toast } from "../utils/helpers";
import adminAPI from "./../apis/admin";
import AdminNav from "../components/AdminNav";

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchUser();
    this.judgeMainAdmin();
  },
  methods: {
    async fetchUser() {
      try {
        const { data } = await adminAPI.user.get();
        // console.log("response data".data);
        this.users = data.users.map((user) => ({
          ...user,
        }));
        this.judgeMainAdmin();
      } catch (error) {
        Toast.fire({
          icon: "erorr",
          title: "無法讀取資料",
        });
      }
    },
    async toggleUserRole(id) {
      const authority = JSON.stringify({
        isAdmin: String(!this.users.find((user) => user.id === id).isAdmin),
      });
      console.log("authority", authority);
      try {
        const { data } = await adminAPI.user.update({
          userId: id,
          authority: authority,
        });
        console.log(data);

        this.users = this.users.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              isAdmin: !user.isAdmin,
            };
          }
          return user;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前沒有權限",
        });
      }
    },
    judgeMainAdmin() {
      const mainAdminId = this.currentUser.id;

      this.users = this.users.map((user) => {
        if (user.id === mainAdminId || user.id === 1) {
          // root 權限不可變更
          return {
            ...user,
            mainAdmin: true,
          };
        }
        return user;
      });
    },
  },
  watch: {
    currentUser() {
      this.judgeMainAdmin();
    },
  },
};
</script>