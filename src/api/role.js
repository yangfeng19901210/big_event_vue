
// 导入request.js请求工具
import request from '@/utils/request.js'
// 获取系统所有角色信息
export const getAllRolesService = ()=>{
    return request.get('/role/getAllRoles');
}
// 获取当前用户角色
export const getUserRolesService = (userId)=>{
    return request.get('/role/getUserRoles/'+userId);
}


