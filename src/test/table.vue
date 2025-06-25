<script lang="ts" setup>
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'

const currentPage4 = ref(2)
const pageSize4 = ref(5)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
import {
  Delete,
  Edit
} from '@element-plus/icons-vue'
const tableData = [
  {
    title: '标题1',
    category: '时事',
    time: '2025-01-01',
    state: '已发布'
  },{
    title: '标题1',
    category: '时事',
    time: '2025-01-01',
    state: '已发布'
  },{
    title: '标题1',
    category: '时事',
    time: '2025-01-01',
    state: '已发布'
  },{
    title: '标题1',
    category: '时事',
    time: '2025-01-01',
    state: '已发布'
  },{
    title: '标题1',
    category: '时事',
    time: '2025-01-01',
    state: '已发布'
  }
]
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="文章标题" />
    <el-table-column prop="category" label="分类" />
    <el-table-column prop="time" label="发表时间" />
    <el-table-column prop="state" label="状态" />
    <!-- 不需要绑定数据，所以不需要prop属性 -->
    <el-table-column label="操作" width="180">
        <div>
            <el-button type="primary" :icon="Edit" circle />
            <el-button type="danger" :icon="Delete" circle />
        </div>
    </el-table-column>
  </el-table>
  <el-pagination 
      class="el-p"
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[5, 10, 15, 20]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="jumper,total, sizes, prev, pager, next"
      :total="20"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>
<style scoped>
    /* 添加类选择器，控制元素 */
    .el-p{
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
</style>