<template>
  <div class="card mb-3" style="max-width: 540px; margin: auto">
    <div class="row no-gutters">
      <div class="col-md-4">
        <router-link
          :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id } }"
        >
          <img class="card-img" :src="restaurant.image" />
        </router-link>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ restaurant.name }}</h5>
          <span class="badge badge-secondary"
            >收藏數：{{ restaurant.FavoriteCount }}</span
          >
          <p class="card-text">
            {{ restaurant.description }}
          </p>
          <router-link
            :to="{
              name: 'restaurant-dashboard',
              params: { id: restaurant.id },
            }"
            class="btn btn-primary mr-2"
            >Dashboard</router-link
          >

          <button
            @click.prevent.stop="unFavorite(restaurant.id)"
            v-if="restaurant.isFavorited"
            type="button"
            class="btn btn-danger mr-2"
          >
            移除最愛
          </button>
          <button
            @click.prevent.stop="addFavorite(restaurant.id)"
            v-else
            type="button"
            class="btn btn-primary"
          >
            加到最愛
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";
export default {
  props: {
    initinalRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: [],
    };
  },
  created() {
    this.fetchRestaurantTop();
  },
  methods: {
    fetchRestaurantTop() {
      this.restaurant = this.initinalRestaurant;
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await userAPI.addFavorite({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const nunber = this.restaurant.FavoriteCount + 1;
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
          FavoriteCount: nunber,
        };
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試",
        });
      }
    },
    async unFavorite(restaurantId) {
      try {
        const { data } = await userAPI.deleteFavorite({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const nunber = this.restaurant.FavoriteCount - 1;
        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
          FavoriteCount: nunber,
        };
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法將餐廳刪除最愛，請稍後再試",
        });
      }
    },
  },
};
</script>