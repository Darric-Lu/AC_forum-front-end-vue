<template>
  <div class="album py-4 bg-light">
    <div class="container">
      <div class="card mb-3">
        <UserProfileCard
          :profile="profile"
          :currentUser="currentUser"
          :initial-is-followed="isFollowed"
        />
      </div>
      <div class="row">
        <div class="col-md-4">
          <UserFollowingsCard :Followings="Followings" />
          <br />
          <UserFollowersCard :Followers="Followers" />
        </div>
        <div class="col-md-8">
          <UserCommentsCard :Comments="Comments" />
          <br />
          <UserFavoritedRestaurantsCard
            :FavoritedRestaurants="FavoritedRestaurants"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard";
import UserFollowingsCard from "../components/UserFollowingsCard.vue";
import UserFollowersCard from "../components/UserFollowersCard.vue";
import UserCommentsCard from "../components/UserCommentsCard.vue";
import UserFavoritedRestaurantsCard from "../components/UserFavoritedRestaurantsCard.vue";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "UserProfile",
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
  },
  data() {
    return {
      profile: {},
      Comments: [],
      FavoritedRestaurants: [],
      Followers: [],
      Followings: [],
      isFollowed: "",
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchData(id);
    next();
  },
  created() {
    const { id } = this.$route.params;
    this.fetchData(id);
  },
  methods: {
    async fetchData(userId) {
      console.log("user id", userId);
      try {
        const { data } = await userAPI.get({ userId });

        const { profile, isFollowed } = data;
        const {
          Comments,
          FavoritedRestaurants,
          Followers,
          Followings,
        } = profile;
        this.profile = { ...profile };
        this.Comments = Comments;
        this.FavoritedRestaurants = FavoritedRestaurants;
        this.Followers = Followers;
        this.Followings = Followings;
        this.isFollowed = isFollowed;

        console.log("data", data);
      } catch (error) {
        Toast.fire({
          title: "無法載入請稍後再試",
          icon: "error",
        });
      }
    },
  },
};
</script>