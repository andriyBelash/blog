<template>
  <div v-if="posts.length > 0">
    <h1>Список постів</h1>
    <transition-group name="post-list">
      <post-item-vue
        v-for="post in posts"
        :post="post"  
        :key="post.id" 
        @remove="$emit('remove', post)"
        ></post-item-vue>
    </transition-group>
  </div>
  <h2 v-else style="color:red">
      Список постів пустий
  </h2>
</template>

<script>
import PostItemVue from "./PostItem.vue";
export default {
components: {PostItemVue},
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
  .post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all .4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>