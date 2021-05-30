<template>
  <table class="table">
    <Spinner v-if="isLoading" />
    <template v-else>
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Category</th>
          <th scope="col">Name</th>
          <th scope="col" width="300">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="restaurant in restaurants" :key="restaurant.id">
          <th scope="row">
            {{ restaurant.id }}
          </th>
          <td>
            {{ restaurant.Category ? restaurant.Category.name : "未分類" }}
          </td>
          <td>{{ restaurant.name }}</td>
          <td class="d-flex justify-content-between">
            <router-link
              :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }"
              class="btn btn-link"
            >
              Show
            </router-link>
            <router-link
              :to="{
                name: 'admin-restaurant-edit',
                params: { id: restaurant.id },
              }"
              class="btn btn-link"
              >Edit</router-link
            >

            <button
              @click.stop.prevent="deleteRestaurant(restaurant.id)"
              type="button"
              class="btn btn-link"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </template>
  </table>
</template>

<script>
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";
import Spinner from "../components/Spinner";

export default {
  data() {
    return {
      restaurants: [],
      isLoading: true,
    };
  },
  components: {
    Spinner,
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      try {
        const { data } = await adminAPI.restaurant.get();
        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得管理者餐廳列表，請稍號再試",
        });
      }
    },
    async deleteRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurant.delete(restaurantId);

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurants = this.restaurants.filter(
          (restaurant) => restaurant.id !== restaurantId
        );
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "管理者無法刪除餐廳資料，請稍號再試",
        });
      }
    },
  },
};
</script>