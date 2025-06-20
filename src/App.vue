<!-- <script>
  // 写数据
  export default{
    data() {
      return {
        msg:'上海'
      }
    }
  }
</script> -->

<script setup>
  import {ref} from 'vue';
  // 调用ref函数定义响应式数据
  const msg = ref('西安');
  import apiVue from './Api.vue'
  import Articlevue from './Article.vue';
  import buttonVue from './test/button.vue';
</script>

<template>
<!-- html -->
<!-- <h1>北京</h1> -->
  <!-- <h1>{{msg}}</h1>
  <br/>
  <apiVue/> -->
  <!-- <Articlevue/> -->
  <br/>
  <buttonVue/>
</template>

<style scoped>
  /* 样式 */
  h1{
    color: red;
  }
</style>
