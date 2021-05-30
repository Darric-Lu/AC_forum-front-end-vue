<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <div class="col-md-12">
          <h1>{{ restaurant.name }}</h1>
          <span class="badge badge-secondary mt-1 mb-3">
            {{ restaurant.categoryName }}
          </span>
        </div>
        <div class="col-md-4">
          <img
            class="img-responsive center-block"
            :src="restaurant.image | emptyImage"
            style="width: 250px; margin-bottom: 25px"
          />
          <div class="well">
            <ul class="list-unstyled">
              <li>
                <strong>Opening Hour:</strong>
                {{ restaurant.openingHours }}
              </li>
              <li>
                <strong>Tel:</strong>
                {{ restaurant.tel }}
              </li>
              <li>
                <strong>Address:</strong>
                {{ restaurant.address }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-8">
          <p>{{ restaurant.description }}</p>
        </div>
      </div>
    </template>
    <hr />
    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>
<script>
import { Toast } from "../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";
import adminAPI from "../apis/admin";
import Spinner from "../components/Spinner";

export default {
  name: "AdminRestaurant",
  mixins: [emptyImageFilter],
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
      },
      isLoading: true,
    };
  },
  components: {
    Spinner,
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurant.getDetail({ restaurantId });
        const { id, name, image, tel, address, description } = data.restaurant;
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          categoryName: data.restaurant.Category.name
            ? data.restaurant.Category.name
            : "未分類",
          image,
          openingHours: data.restaurant.opening_hours,
          tel,
          address,
          description,
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "目前無法載入餐廳詳細頁面",
        });
      }
      // const { restaurant } = dummyData;
      // this.restaurant = {
      //   ...this.restaurant,
      //   id: restaurant.id,
      //   name: restaurant.name,
      //   categoryName: restaurant.Category.name
      //     ? restaurant.Category.name
      //     : "未分類",
      //   image: restaurant.image,
      //   openingHours: restaurant.opening_hours,
      //   tel: restaurant.tel,
      //   address: restaurant.address,
      //   description: restaurant.description,
      // };
    },
  },
};
</script>