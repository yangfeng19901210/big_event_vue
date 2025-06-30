<script setup>
// 导入样式图标
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// 从vue中导入ref函数
import { ref } from 'vue'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
// 定义注册数据模型
const registerData = ref({
    username:'',
    password:'',
    rePassword:''
})
// 校验密码函数
const checkRePassword = (rule,value,callback)=>{
    if(value===''){
        callback(new Error('请再次确认密码'))
    }else if(value !==registerData.value.password){
        callback(new Error('请确保两次输入的密码一样'))
    }else{
        callback()
    }
}
// 定义表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  rePassword: [
    { validator: checkRePassword, trigger: 'blur' }
  ]
  
}
// 调用后台接口完成注册
import {userRegisterService} from '@/api/user.js'
const register = async ()=>{
    // registerData是一个响应式对象，如果要获取值，需要.value
    let result = await userRegisterService(registerData.value);
    ElMessage.success(result.msg?result.msg:'注册成功');
}
</script>

<template>
    <!-- el-row在页面内设置一个行元素，并且定义一个类选择器来控制行元素样式 -->
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- v-if 和 v-else 的组对依赖于物理相邻性和同父级作用域，Vue 通过编译时的逻辑分支生成和运行时的动态 DOM 操作实现条件渲染 -->
            <!-- 注册表单 
             1.ref="form" 用于在vue组件中通过this.$refs.form 访问表单实例，调用 validate() 验证、resetFields() 重置等方法
             2.size="large" 统一设置表单内输入框、按钮等子组件的尺寸为“大号”
             扩展：若需单独调整表单项尺寸，可在 <el-form-item> 上覆盖 size 属性
             3.autocomplete="off" 禁用浏览器自动填充功能，提升表单安全性
             扩展：需在 <el-input> 上同时设置 name 属性（如 name="password"）
                  提交时需触发原生表单的 submit() 事件（而非仅 AJAX 提交）
             4.v-if="isRegister" 根据 isRegister 布尔值切换显示注册表单
             扩展：切换时表单验证状态会被销毁（v-if 触发的 DOM 销毁重建）
                   若需保留表单数据，改用 v-show（仅切换 CSS 显示）
            -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" underline="never" @click="isRegister = false">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else>
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item>
                    <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" underline="never">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space>登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" underline="never" @click="isRegister = true">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    // 确保页面占据全屏高度
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>