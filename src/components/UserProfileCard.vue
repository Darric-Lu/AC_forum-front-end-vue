<template>
  <div class="row row no-gutters">
    <div class="col-md-4">
      <img :src="profile.image" alt="" width="300px" height="300px" />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ profile.name }}</h5>
        <p class="card-text">{{ profile.email }}</p>
        <ul class="list-unstyled list-inline">
          <li>
            <strong>{{ count.Comments }}</strong> 已評論餐廳
          </li>
          <li>
            <strong>{{ count.FavoritedRestaurants }}</strong>
            收藏的餐廳
          </li>
          <li>
            <strong>{{ count.Followings }}</strong> followings (追蹤者)
          </li>
          <li>
            <strong>{{ count.Followers }}</strong> followers (追隨者)
          </li>
        </ul>
        <!-- <p> -->
        <div>
          <div v-if="currentUserId === profileUserId">
            <router-link
              :to="{ name: 'user-edit', params: { id: profile.id } }"
            >
              <button type="submit" class="btn btn-primary">edit</button>
            </router-link>
          </div>
          <div v-else>
            <button
              @click.prevent.stop="addFollowered(profile.id)"
              v-if="!isFollowed"
              class="btn btn-primary"
            >
              追蹤
            </button>
            <button
              @click.prevent.stop="unFollowered(profile.id)"
              v-if="isFollowed"
              class="btn btn-danger"
            >
              取消追蹤
            </button>
          </div>
        </div>
        <!-- </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import usersAPI from "../apis/users";

export default {
  props: {
    profile: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Object,
      require: true,
    },
    initialIsFollowed: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      // presetImage:
      //   "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg",
      count: {
        Comments: "",
        FavoritedRestaurants: "",
        Followings: "",
        Followers: "",
      },
      currentUserId: "false",
      profileUserId: "false",
      isFollowed: "false",
    };
  },
  created() {},
  methods: {
    async addFollowered(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isFollowed = true;
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

        this.isFollowed = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "目前無法取消追蹤，請稍後再試",
        });
      }
    },
    fetchDataCount() {
      this.count.Comments = this.profile.Comments.length;
      this.count.FavoritedRestaurants = this.profile.FavoritedRestaurants.length;
      this.count.Followings = this.profile.Followings.length;
      this.count.Followers = this.profile.Followers.length;
      this.isFollowed = this.initialIsFollowed;
    },
  },
  watch: {
    profile() {
      this.fetchDataCount();
      this.profileUserId = this.profile.id;
    },
    currentUser() {
      this.currentUserId = this.currentUser.id;
    },
  },
};
</script>