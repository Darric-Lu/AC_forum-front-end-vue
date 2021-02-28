<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5 text-center">人氣餐廳</h1>
    <hr />
    <TopCards
      v-for="restaurant in restaurantsTops"
      :key="restaurant.id"
      :initinalRestaurant="restaurant"
    />
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import TopCards from "../components/TopCards";
import restaurantAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

export default {
  components: {
    NavTabs,
    TopCards,
  },
  data() {
    return {
      restaurantsTops: [],
    };
  },
  created() {
    this.fetchRestaurantTop();
  },
  methods: {
    async fetchRestaurantTop() {
      try {
        const { data } = await restaurantAPI.getRestaurantsTop();
        this.restaurantsTops = data.restaurants;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法載入人氣餐廳，請稍後再試",
        });
      }
    },
  },
};
</script>