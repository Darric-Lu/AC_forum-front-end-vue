<template>
  <div class="container py-5">
    <RestaurantDetail
      :initial-restaurant="restaurant"
      @after-add-favorite="afterAddFavorite"
      @after-remove-favorite="afterRemoveFavorite"
      @after-add-like="afterAddLike"
      @after-remove-like="afterRemoveLike"
    />

    <hr />

    <RestaurantComments
      :restaurantComments="restaurantComments"
      :currentUser="currentUser"
      @after-delete-comment="afterDeleteComment"
    />

    <CreateComment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from "../components/RestaurantDetail";
import RestaurantComments from "../components/RestaurantComments";
import CreateComment from "../components/CreateComment";
import restaurantAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";
import commentsAPI from "../apis/comments";
import userAPI from "../apis/users";

export default {
  name: "Restaurant",
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
  },
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
        isFavorited: false,
        isLiked: false,
      },
      restaurantComments: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await restaurantAPI.getRestaurant({ restaurantId });
        const { restaurant, isFavorited, isLiked } = data;
        const {
          id,
          name,
          Category,
          image,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments,
        } = restaurant;
        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : "未分類",
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        };
        this.restaurantComments = Comments;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: " 無法取得餐廳清單，請稍後再試",
        });
      }
    },
    async afterDeleteComment(commentId) {
      try {
        const response = await commentsAPI.deleteComments(commentId);
        response;
        this.restaurantComments = this.restaurantComments.filter(
          (comment) => comment.id !== commentId
        );
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法山刪除評論，請稍後在試",
        });
      }
    },
    async afterCreateComment(payload) {
      const { restaurantId, text } = payload;
      try {
        const response = await commentsAPI.creatComments({
          restaurantId,
          text,
        });
        response;
        this.restaurantComments.push({
          RestaurantId: restaurantId,
          User: {
            id: this.currentUser.id,
            name: this.currentUser.name,
          },
          text,
          createdAt: new Date(),
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法新增評論，請稍後再試",
        });
      }
    },
    async afterAddFavorite(restaurantId) {
      try {
        const { data } = await userAPI.addFavorite({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試",
        });
      }
    },
    async afterRemoveFavorite(restaurantId) {
      try {
        const { data } = await userAPI.deleteFavorite({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳刪除最愛，請稍後再試",
        });
      }
    },
    async afterAddLike(restaurantId) {
      try {
        const { data } = await userAPI.addLiked({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入Like，請稍後再試",
        });
      }
    },
    async afterRemoveLike(restaurantId) {
      try {
        const { data } = await userAPI.unLiked({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入Like，請稍後再試",
        });
      }
    },
  },
};
</script>