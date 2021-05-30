<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5 text-center">人氣餐廳</h1>
    <hr />
    <Spinner v-if="isLoading" />
    <template v-else>
      <TopCards
        v-for="restaurant in restaurantsTops"
        :key="restaurant.id"
        :initinalRestaurant="restaurant"
    /></template>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import TopCards from "../components/TopCards";
import restaurantAPI from "../apis/restaurants";
import Spinner from "../components/Spinner";
import { Toast } from "../utils/helpers";

export default {
  components: {
    NavTabs,
    TopCards,
    Spinner,
  },
  data() {
    return {
      restaurantsTops: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchRestaurantTop();
  },
  methods: {
    async fetchRestaurantTop() {
      try {
        const { data } = await restaurantAPI.getRestaurantsTop();
        this.restaurantsTops = data.restaurants.filter((e) => e);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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