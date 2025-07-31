//定制请求的实例
// 导入axios库
import axios from 'axios'
import { ElMessage } from 'element-plus'
import {useTokenStore} from '@/stores/token.js'
import router from '@/router'
//定义变量记录公共前缀
// const baseURL = "http://localhost:8090";
const baseURL = "/api";
const instance = axios.create({baseURL});
// 添加请求拦截器
instance.interceptors.request.use(
    // 请求前回调添加token
    (config)=>{
        const tokenStore = useTokenStore();
        if(tokenStore.token){
            config.headers.Authorization = tokenStore.token;
        }
        return config;
    },
    (err)=>{
        Promise.reject(err);
    }
);
// 添加响应拦截器(本身就是异步处理)
instance.interceptors.response.use(
    
    result=>{
        console.log('result'+JSON.stringify(result));
        // 判断业务状态码
        if(result.data.code===200){
            return result.data;
        // 用户退出后将不不能访问，直接跳转到登录页面
        }else if (result.data.code===500) {
            if(result.data.message==='令牌不能为空' || result.data.message==='token无效'){
                ElMessage.error(result.data.message?result.data.message:'请先登录');
                router.push('/login');
            }else{
               ElMessage.error(result.data.message?result.data.message:'服务异常'); 
            }
            
        // 非法的token直接跳转到登录页面
        }else if (result.data.code===401) {
            ElMessage.error(result.data.message?result.data.message:'请先登录');
            router.push('/login');
        }
        return Promise.reject(result.data);
        
    },
    err=>{
        ElMessage.error('服务异常'); 
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)
// 导出实例
export default instance;