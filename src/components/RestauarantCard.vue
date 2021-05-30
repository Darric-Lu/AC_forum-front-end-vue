<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image"
        alt="Card image cap"
        width="286px"
        height="180px"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{
          restaurant.Category ? restaurant.Category.name : "未分類"
        }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          :disabled="isProcessing"
          @click.prevent.stop="deletFavorite(restaurant.id)"
          v-if="restaurant.isFavorited"
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
        >
          移除最愛
        </button>
        <button
          :disabled="isProcessing"
          @click.prevent.stop="addFavorite(restaurant.id)"
          v-else
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
        >
          加到最愛
        </button>
        <button
          :disabled="isProcessing"
          @click.prevent.stop="unlike(restaurant.id)"
          v-if="restaurant.isLiked"
          type="button"
          class="btn btn-danger like mr-2"
        >
          Unlike
        </button>
        <button
          :disabled="isProcessing"
          @click.prevent.stop="like(restaurant.id)"
          v-else
          type="button"
          class="btn btn-primary like mr-2"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";
export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isProcessing: false,
    };
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await userAPI.addFavorite({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試",
        });
      }
    },
    async deletFavorite(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await userAPI.deleteFavorite({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法將餐廳刪除最愛，請稍後再試",
        });
      }
    },
    async like(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await userAPI.addLiked({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法加入Like，請稍後再試",
        });
      }
    },
    async unlike(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await userAPI.unLiked({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法加入Like，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.badge.badge-secondary {
  padding: 0;
  margin: 8px 0;
  color: #bd2333;
  background-color: transparent;
}

.btn,
.btn-border.btn:hover {
  margin: 7px 14px 7px 0;
}

.card {
  margin-bottom: 2rem !important;
}
.card-img-top {
  background-color: #efefef;
}

.card-body {
  padding: 17.5px;
}

.card-footer {
  padding: 9px 17.5px;
  border-color: rgb(232, 232, 232);
  background: white;
}
</style>