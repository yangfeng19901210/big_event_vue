<script setup>
  import {ref} from 'vue';
  // 调用ref函数定义响应式数据
  const msg = ref('西安');
  import apiVue from './Api.vue'
  import Articlevue from './Article.vue';
  import buttonVue from './test/button.vue';
  import tableVue from './test/table.vue';
</script>

<template>
  hello vue3
</template>

<style scoped>
  /* 样式 */
  /* h1{
    color: red;
  } */
</style>
