<template>
  <div class="post">
    <div>
      <div class="">{{ post.id }}</div>
      <div><strong>Назва: </strong>{{ post.title }}</div>
      <div><strong>Опис: </strong>{{ post.body }}</div>
    </div>
    <div class="post-buttons">
        <my-button 
        @click="$emit('remove', post)"
        >Видалити</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post {
  margin-top: 15px;
  padding: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
}
.post-buttons{
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>