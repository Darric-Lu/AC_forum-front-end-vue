<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ Followers.length }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <router-link
        v-for="user in Followers"
        :key="user.id"
        :to="{ name: 'user', params: { id: user.id } }"
      >
        <img :src="user.image" width="60" height="60" class="avatar" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFollowersCard",
  props: {
    Followers: {
      type: Array,
      required: true,
    },
  },
};
</script>