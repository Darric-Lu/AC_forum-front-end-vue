<template>
  <div class="card">
    <div class="card-header">最新評論</div>
    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <h4>
          <router-link
            :to="{
              name: 'restaurant',
              params: { id: comment.Restaurant.id },
            }"
          >
            {{ comment.Restaurant.name }}
          </router-link>
        </h4>
        <p>{{ comment.text }}</p>
        by
        <a href="#"> {{ comment.Restaurant.name }} </a>
        at {{ comment.createdAt | fromNow }}
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  mixins: [fromNowFilter],
  // created() {
  //   this.dataFilter();
  // },
  // methods: {
  //   dataFilter() {
  //     return this.comments.filter((e) => e.Restaurant);
  //   },
  // },
};
</script>