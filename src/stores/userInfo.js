// 定义store
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const userInfoStore = defineStore('userInfo',()=>{
    //定义状态相关的内容
    const info = ref({})

    // 设置用户信息
    const setInfo = (newInfo)=>{
        info.value = newInfo;
    }
    // 删除用户信息
    const removeInfo = ()=>{
        info.value = {};
    }
    return info,setInfo,removeInfo
},{persist:true});