<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.Category.name }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.Comments.length }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import restaurantAPI from "../apis/restaurants";

export default {
  name: "RestaurantDashboard",
  data() {
    return {
      restaurant: {
        name: "",
        viewCounts: 0,
        Category: {
          name: "",
        },
        Comments: [],
      },
    };
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
    async fetchData(id) {
      try {
        const { data } = await restaurantAPI.gitRestaurantDashboard(id);
        this.restaurant = data.restaurant;
      } catch (error) {
        Toast.fire({
          title: "目前無法賭取資料",
          icon: "error",
        });
      }
    },
  },
};
</script>