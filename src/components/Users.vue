<template>
  <div class="col-3">
    <router-link :to="{ name: 'user', params: { id: user.id } }">
      <img
        :src="user.image ? user.image : presetImage"
        width="140px"
        height="140px"
      />
    </router-link>
    <h2>{{ user.name }}</h2>
    <span class="badge badge-secondary"
      >追蹤人數：{{ user.FollowerCount }}</span
    >
    <p class="mt-3">
      <button
        @click.prevent.stop="unFollowered(user.id)"
        v-if="user.isFollowed"
        type="button"
        class="btn btn-danger"
      >
        取消追蹤
      </button>
      <button
        @click.prevent.stop="addFollowered(user.id)"
        v-else
        type="button"
        class="btn btn-primary"
      >
        追蹤
      </button>
    </p>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import usersAPI from "../apis/users";
export default {
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
      presetImage:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
    };
  },
  created() {
    // console.log(this.user);
  },
  methods: {
    async addFollowered(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const nunber = this.user.FollowerCount + 1;
        this.user = {
          ...this.user,
          isFollowed: true,
          FollowerCount: nunber,
        };
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "目前無法追蹤，請稍後再試",
        });
      }
    },
    async unFollowered(userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const nunber = this.user.FollowerCount - 1;
        this.user = {
          ...this.user,
          isFollowed: false,
          FollowerCount: nunber,
        };
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "目前無法取消追蹤，請稍後再試",
        });
      }
    },
  },
};
</script>