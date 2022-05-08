<template>
  <div class="navbar">
      <div @click="$router.push('/')" class="vue3">Vue-3</div>
      <div class="navbar__btns">
          <my-button @click="$router.push('/users')">Пости</my-button>
          <my-button  @click="$router.push('/about')">Інформація</my-button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'my-navbar'
}
</script>

<style>
.navbar{
    height: 80px;
    background-color: rgb(29, 28, 28);
    box-shadow: 2px 2px 4px grey;
    display: flex;
    gap: 20px;
    padding: 20px;
    align-items: center;
}
.vue3{
    text-align: center;
    font-size: 20px;
    text-transform: uppercase;
    cursor: pointer;
}
.navbar__btns{
    margin-left: auto;
}
</style>