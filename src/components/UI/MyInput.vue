<template>
  <input class="input" :value="modelValue" @input="updateInput" type="text">
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: {
            String, Number
        }
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
.input {
  padding: 10px;
  margin: 10px 0 0 0;
  width: 100%;
  border: 1px solid teal;
  background-color: rgb(33, 30, 30);
  color: blanchedalmond;
}
.input::placeholder {
  color: blanchedalmond;
}
</style>