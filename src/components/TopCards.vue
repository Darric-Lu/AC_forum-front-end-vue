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
            @click.prevent.stop="unFavorite"
            v-if="restaurant.isFavorited"
            type="button"
            class="btn btn-danger mr-2"
          >
            移除最愛
          </button>
          <button
            @click.prevent.stop="addFavorite"
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
    addFavorite() {
      const nunber = this.restaurant.FavoriteCount + 1;
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true,
        FavoriteCount: nunber,
      };
    },
    unFavorite() {
      const nunber = this.restaurant.FavoriteCount - 1;
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false,
        FavoriteCount: nunber,
      };
    },
  },
};
</script>