<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([]);
// 申明异步函数加载文章分类列表
import {articleCategoryListService,articleCategoryAddService,
    articleCategoryUpdateService,articleCategoryDeleteService} from '@/api/article.js'
import { ElMessage,ElMessageBox } from 'element-plus'
const articleCategoryList = async()=>{
    let result = await articleCategoryListService();
    categorys.value = result.data;
}
//进行方法调用
articleCategoryList();
//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})
//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    categoryAlias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
    ]
}
const categoryFormef = ref(null); 
// 访问后台添加分类
const addCategory = async ()=>{
    categoryFormef.value.validate(async(valid) => {
        if (valid) {
            let result = await articleCategoryAddService(categoryModel.value);
            ElMessage.success(result.message?result.message:'添加成功');
            dialogVisible.value = false;
            articleCategoryList();
        } else {
            ElMessage.error('请填写表单必须项');
        }
    });
    
}
// 每次打开时清空之前的数据
const clearCategoryModelData = ()=>{
    categoryModel.value={
        categoryName:'',
        categoryAlias:''
    }
}
// 定义数据模型，动态切换对话框标题
const title = ref('');
const showCategoryData = (row)=>{
    dialogVisible.value = true;
    title.value='编辑分类';
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.categoryAlias = row.categoryAlias;
    categoryModel.value.id = row.id;
}
// 删除文章分类函数
const deleteCategory = (row)=>{
    ElMessageBox.confirm(
        '你确认删除该分类信息吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //用户点击了确认
            let result = await articleCategoryDeleteService(row.id)
            ElMessage.success(result.message?result.message:'删除成功')
            //再次调用getAllCategory，获取所有文章分类
            articleCategoryList()
        })
        .catch(() => {
            //用户点击了取消
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}
// 编辑分类提交数据函数
const updateCategory = async ()=>{
    let result = await articleCategoryUpdateService(categoryModel.value);
    ElMessage.success(result.message?result.message:'修改成功');
    dialogVisible.value = false;
    articleCategoryList();
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true;clearCategoryModelData();title='添加分类'">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showCategoryData(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px" ref="categoryFormef">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title==='添加分类'?addCategory():updateCategory()"> 确认 </el-button>
                </span>
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