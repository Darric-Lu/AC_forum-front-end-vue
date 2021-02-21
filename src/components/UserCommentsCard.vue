<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ Comments.length }}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <router-link
        v-for="restaurant in Comments"
        :key="restaurant.id"
        :to="{ name: 'restaurant', params: { id: restaurant.id } }"
      >
        <img
          :src="restaurant.Restaurant.image"
          width="60"
          height="60"
          class="avatar"
        />
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Comments: {
      type: Array,
      required: true,
    },
  },
};
</script>