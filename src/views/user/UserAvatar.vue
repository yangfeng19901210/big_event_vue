<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import {ref} from 'vue'
import {useUserInfoStore} from '@/stores/userInfo.js'
import {useTokenStore} from '@/stores/token.js'
import avatar from '@/assets/default.png'
import {updateAvatarService} from '@/api/user.js';
import { ElMessage } from 'element-plus'
const uploadRef = ref()
const userInfoStore = useUserInfoStore()
const tokenStore = useTokenStore();
//用户头像地址
const imgUrl=ref(userInfoStore?.info?.userPic?userInfoStore.info.userPic:avatar)
const uploadSuccess = (result)=>{
    imgUrl.value = result.data;
    
}
// 更新用户头像
const updateAvatar = async()=>{
    //调用接口更新用户头像
    let result = await updateAvatarService(imgUrl.value);
     ElMessage.success(result.message? result.message:'修改成功')
    //更新pinia中的数据
    userInfoStore.info.userPic=imgUrl.value
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>更换头像</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-upload 
                    ref="uploadRef"
                    class="avatar-uploader" 
                    :show-file-list="false"
                    :auto-upload="true"
                    action="/api/upload" name="file" :headers="{'Authorization':tokenStore.token}"
                    :on-success="uploadSuccess"
                    >
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <img v-else :src="avatar" width="278" />
                </el-upload>
                <br />
                <el-button type="primary" :icon="Plus" size="large"  @click="uploadRef.$el.querySelector('input').click()">
                    选择图片
                </el-button>
                <el-button type="success" :icon="Upload" size="large" @click="updateAvatar">
                    上传头像
                </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>
<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 278px;
            height: 278px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>