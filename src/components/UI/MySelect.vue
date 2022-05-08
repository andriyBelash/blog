<template>
  <select class="select" name="" id="" v-model="modelValue" @change="changeOption">
      <option disabled value="">Виберіть зі списку</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
  </select>
</template>

<script>

export default {
    name: 'my-select',
    props: {
        modelValue: {
            type: String,
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeOption(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }, 
}
</script>

<style>
.select{
    border: 1px solid teal;
    color: white;
    background-color: rgb(29, 28, 28);
    padding: 5px 20px;
}
</style>