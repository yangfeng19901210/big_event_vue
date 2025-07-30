<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref,reactive  } from 'vue'
const userName = ref('')
const nickName = ref('')
import { userPageService } from '@/api/user'    
import { getAllRolesService,getCurrentUserRolesService } from '@/api/role'
//文章分类数据模型
const categorys = ref([
    {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])

//文章列表数据模型
const users = ref([
    // {
    //     "id": 5,
    //     "nickname": "张三",
    //     "username": "liubei",
    //     "email": "155255438831@163.com",
    //     "createTime": "2023-09-03 11:55:30"
    // },
    // {
    //     "id": 6,
    //     "nickname": "李四",
    //     "username": "liubei",
    //     "email": "155255438831@163.com",
    //     "createTime": "2023-09-03 11:55:30"
    // },
    // {
    //     "id": 7,
    //     "nickname": "王五",
    //     "username": "liubei",
    //     "email": "155255438831@163.com",
    //     "createTime": "2023-09-03 11:55:30"
    // }
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(3)//总条数
const pageSize = ref(10)//每页条数
const centerDialogVisible = ref(false)
const selectedRoles = ref([]); // 初始化为空数组
const setRoleDataModel = ref({
  nickName: '',
  userName: ''
})

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
}
// 分页获取文章列表
const getUserPageData = async ()=>{
    let userPageQuery = {
        pageNo:pageNum.value,
        pageSize:pageSize.value,
        userName:userName.value?userName.value:null,
        nickName:nickName.value?nickName.value:null
    }
    let result = await userPageService(userPageQuery);
    //渲染数据
    total.value = result.data.total;
    users.value = result.data.items;

}
getUserPageData();
const allRoles = ref([]); // 初始化为空数组
const loadAllRoles = async(row)=>{
    setRoleDataModel.value.nickName = row.nickname;
    setRoleDataModel.value.userName = row.username;
    let result = await getAllRolesService();
    allRoles.value = result.data;
    //获取当前用户角色并设置
    let userRolesData =  await getCurrentUserRolesService();
    selectedRoles.value = userRolesData.data.map(role=>role.roleCode);

}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>用户管理</span>
                <div class="extra">
                    <el-button type="primary">添加用户</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="用户名：">
                <el-input v-model="userName" style="width: 190px" placeholder="请输入用户名" />
            </el-form-item>

            <el-form-item label="用户昵称：">
                <el-input v-model="nickName" style="width: 190px" placeholder="请输入用户昵称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getUserPageData">搜索</el-button>
                <el-button @click="userName='';nickName='';getUserPageData()">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="users" style="width: 100%">
            <el-table-column label="用户编号" width="150" prop="id"></el-table-column>
            <el-table-column label="用户昵称" prop="nickname"></el-table-column>
            <el-table-column label="用户名" prop="username"> </el-table-column>
            <el-table-column label="用户邮箱" prop="email"> </el-table-column>
            <el-table-column label="创建时间" prop="createTime"> </el-table-column>
            <el-table-column label="操作" align="center">
                <!-- <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
                </template> -->
                <template #default="{ row }">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                    编辑
                    </el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >
                    删除
                    </el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="centerDialogVisible = true;loadAllRoles(row)"
                    >
                    设置角色
                    </el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5 ,10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
        <el-dialog
            v-model="centerDialogVisible"
            title="设置用户角色"
            width="500"
            align-center
        >
            <el-form :model="setRoleDataModel" label-width="auto" style="max-width: 600px">
                <el-form-item label="用户昵称">
                    <el-input v-model="setRoleDataModel.nickName" disabled/>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="setRoleDataModel.userName" disabled/>
                </el-form-item>
                <el-form-item label="角色设置">
                <el-checkbox-group v-model="selectedRoles">
                   <el-checkbox v-for="role in allRoles" :value="role.roleCode" :key="role.roleCode">{{ role.roleName }}</el-checkbox>
                </el-checkbox-group>
                </el-form-item>
            </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                Confirm
                </el-button>
            </div>
            </template>
        </el-dialog>
    </el-card>
</template>
<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>