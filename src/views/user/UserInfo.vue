<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useUserInfoStore } from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();
import {updateUserInfoService} from '@/api/user.js'
//展开语法 {...} 创建一个新对象 ，优点：保护原始数据的安全
// 典型应用场景：从全局状态（如 Pinia 存储）获取用户数据，在组件内独立修改，不直接影响原始状态
const userInfo = ref({...userInfoStore.info})
const rules = {
    nickname: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '昵称必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ],
    email: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
}
const updateUserInfo = async ()=>{
    // 调用接口进行数据提交
    let result = await updateUserInfoService(userInfo.value);
    ElMessage.success(result.message?result.message:'修改成功');

    // 修改pinia中的个人信息
    userInfoStore.setInfo(userInfo.value);

}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="登录名称">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="nickname">
                        <el-input v-model="userInfo.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" prop="email">
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>