// 导入request.js请求工具
import request from '@/utils/request.js'

// 提供调用注册接口的函数
export const userRegisterService = (registerData)=>{
    // 借助于URLSearchParams完成传递
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key,registerData[key]);
    }
    return request.post('/user/register',params);

}

// 提供登录接口函数
export const userLoginService = (loginData)=>{
    // 借助于URLSearchParams完成传递
    const params = new URLSearchParams()
    for (let key in loginData) {
        params.append(key,loginData[key]);
    }
    return request.post('/user/login',params);

}
// 获取用户详细信息
export const userInfoService = ()=>{
    return request.get('/user/userInfo');
}
// 修改用户信息
export const updateUserInfoService = (userInfoData)=>{
    return request.put('/user/update',userInfoData);
}
// 更新用户头像
export const updateAvatarService = (avatarUrl)=>{
    let params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('user/updateAvatar',params);
}