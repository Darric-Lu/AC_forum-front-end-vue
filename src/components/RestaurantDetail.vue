<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image"
        style="width: 250px; margin-bottom: 25px"
      />
      <div class="contact-info-wrap">
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
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id } }"
        class="btn btn-primary btn-border mr-2"
        >Dashboard</router-link
      >

      <button
        @click.prevent.stop="deletFavorite(restaurant.id)"
        v-if="restaurant.isFavorited"
        type="button"
        class="btn btn-danger btn-border mr-2"
      >
        移除最愛
      </button>
      <button
        @click.prevent.stop="addFavorite(restaurant.id)"
        v-else
        type="button"
        class="btn btn-primary btn-border mr-2"
      >
        加到最愛
      </button>
      <button
        @click.prevent.stop="unlike(restaurant.id)"
        v-if="restaurant.isLiked"
        type="button"
        class="btn btn-danger like mr-2"
      >
        Unlike
      </button>
      <button
        @click.prevent.stop="like(restaurant.id)"
        v-else
        type="button"
        class="btn btn-primary like mr-2"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantDetail",
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue,
      };
    },
  },
  methods: {
    addFavorite(restaurantId) {
      this.$emit("after-add-favorite", restaurantId);
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true,
      };
    },
    deletFavorite(restaurantId) {
      this.$emit("after-remove-favorite", restaurantId);
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false,
      };
    },
    like(restaurantId) {
      this.$emit("after-add-like", restaurantId);
      this.restaurant = {
        ...this.restaurant,
        isLiked: true,
      };
    },
    unlike(restaurantId) {
      this.$emit("after-remove-like", restaurantId);
      this.restaurant = {
        ...this.restaurant,
        isLiked: false,
      };
    },
  },
};
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>