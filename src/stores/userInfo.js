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
    //定义当前用户角色响应内容
    const userRoles = ref([]);
    //设置当前用户对应的角色信息
    const setUserRoles = (userRolesInfo)=>{
        userRoles.value = userRolesInfo;
    }
    // 移除用户角色
    const removeUserRoles = ()=>{
        userRoles.value = [];
    }
    return {
        info,setInfo,removeInfo,userRoles,setUserRoles,removeUserRoles
    }
},{
    persist:true
});