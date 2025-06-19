<script setup>
    // 申明响应式数据
    import { ref ,onMounted} from "vue";
    const count = ref(0);
    function increment(){
        count.value++;
    }
    onMounted(()=>{
        console.log('vue已经挂载完毕了...');
    });
</script>

<template>
    <!-- 写html元素 -->
     <button @click="increment">button:{{count}}</button>
</template>

<style>
</style>