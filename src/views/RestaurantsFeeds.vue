<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">最新動態</h1>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <!-- 最新評論 NewestComments-->
        <h3>最新評論</h3>
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import NewestRestaurants from "../components/NewestRestaurants";
import NewestComments from "../components/NewestComments";
import getRestaurantFeedsAPI from "../apis/restaurantFeed";
import { Toast } from "../utils/helpers";

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        const response = await getRestaurantFeedsAPI.getRestaurantFeed();
        const { restaurants, comments } = response.data;
        this.restaurants = restaurants;
        this.comments = comments.filter((e) => e.Restaurant);
      } catch (error) {
        console.log(error);
        Toast.fire({
          title: "最新動態，請稍後重試",
          icon: "error",
        });
      }
    },
  },
};
</script>