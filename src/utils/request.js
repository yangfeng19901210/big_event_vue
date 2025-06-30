//定制请求的实例
// 导入axios库
import axios from 'axios'
import { ElMessage } from 'element-plus'
//定义变量记录公共前缀
// const baseURL = "http://localhost:8090";
const baseURL = "/api";
const instance = axios.create({baseURL});

// 添加响应拦截器(本身就是异步处理)
instance.interceptors.response.use(
    result=>{
        // 判断业务状态码
        if(result.data.code===200){
            return result.data;
        }
        ElMessage.error(result.data.msg?result.data.msg:'服务异常');
        return Promise.reject(result.data);
        
    },
    err=>{
        alert('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)
// 导出实例
export default instance;