// 定义store
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useUserInfoStore = defineStore('userInfo',()=>{
    // 定义响应的内容
    const info = ref({});
    // 修改token的值
    const setInfo = (newInfo)=>{
        info.value = newInfo;
    }
    // 移除token的值
    const removeInfo = ()=>{
        info.value = {};
    }
    return {
        info,setInfo,removeInfo
    }
},{
    persist:true
});