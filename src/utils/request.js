//定制请求的实例
// 导入axios库
import axios from 'axios'
//定义变量记录公共前缀
// const baseURL = "http://localhost:8080";
const baseURL = "/api";
const instance = axios.create({baseURL});

// 添加响应拦截器(本身就是异步处理)
instance.interceptors.response.use(
    result=>{
        return result.data;
    },
    err=>{
        alert('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)
// 导出实例
export default instance;