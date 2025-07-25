import {createRouter,createWebHistory} from 'vue-router'
// 导入组件
import Loginvue from '@/views/Login.vue';
import Layout from '@/views/Layout.vue';
import ArticleCategory from '@/views/article/ArticleCategory.vue';
import ArticleManage from '@/views/article/ArticleManage.vue';
import UserInfo from '@/views/user/UserInfo.vue';
import UserAvatar from '@/views/user/UserAvatar.vue';
import UserResetPassword from '@/views/user/UserResetPassword.vue';
import UserManage from '@/views/system/UserManage.vue';
import RoleManage from '@/views/system/RoleManage.vue';
import PermissionManage from '@/views/system/PermissionManage.vue';
// 定义路由关系
const routes = [
  { path: '/login', component: Loginvue },
  { path: '/', component: Layout ,redirect: '/article/manage',
    children: [
      {
        path: '/article/category',
        component: ArticleCategory,
      },
      {
        path: '/article/manage',
        component: ArticleManage,
      },
      {
        path: '/user/info',
        component: UserInfo,
      },
      {
        path: '/user/avatar',
        component: UserAvatar,
      },
      {
        path: '/user/resetPassword',
        component: UserResetPassword,
      },
      {
        path: '/system/user',
        component: UserManage,
      }
      ,
      {
        path: '/system/role',
        component: RoleManage,
      },
      {
        path: '/system/perm',
        component: PermissionManage,
      }

    ],
  }
]
// 创建路由器
const router = createRouter({
  history: createWebHistory(),
  routes:routes
})
// 导出路由
export default router;
