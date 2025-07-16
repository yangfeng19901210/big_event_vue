<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import {useTokenStore} from '@/stores/token.js'
import {resetPasswordService} from '@/api/user.js'
import { useRouter } from 'vue-router';
const router = useRouter();
//展开语法 {...} 创建一个新对象 ，优点：保护原始数据的安全
// 典型应用场景：从全局状态（如 Pinia 存储）获取用户数据，在组件内独立修改，不直接影响原始状态
const resetPasswordData = ref({
    oldPwd:'',
    newPwd:'',
    rePwd:''
})
const checkRePassword = (rule,value,callback)=>{
    if(value===''){
        callback(new Error('请再次确认密码'))
    }else if(value !==resetPasswordData.value.newPwd){
        callback(new Error('请确保两次输入的密码一样'))
    }else{
        callback()
    }
}
const rules = {
    oldPwd: [
        { required: true, message: '请输入原始密码', trigger: 'blur' },
        {
            pattern: /^\S{5,16}$/,
            message: '原始密码必须是5-16位的非空字符串',
            trigger: 'blur'
        }
    ],
    newPwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        {
            pattern: /^\S{5,16}$/,
            message: '新密码必须是5-16位的非空字符串',
            trigger: 'blur'
        }
    ],
    rePwd: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}
const tokenStore = useTokenStore();
// 重新设置密码，数据更新
const resetPassword = async()=>{
   let result =  await resetPasswordService(resetPasswordData.value);
   ElMessage.success(result.message?result.message:'设置成功');
   // 1.清空token和用户信息
    tokenStore.removeToken();
    // 2.跳转到登录页
    router.push('/login');
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>修改密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="resetPasswordData" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原始密码" prop="oldPwd">
                        <el-input v-model="resetPasswordData.oldPwd" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPwd">
                        <el-input v-model="resetPasswordData.newPwd" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="rePwd">
                        <el-input v-model="resetPasswordData.rePwd" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="resetPassword">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>