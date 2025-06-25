// // 导入axios库
// import axios from 'axios'
// //定义变量记录公共前缀
// const baseURL = "http://localhost:8070";
// const instance = axios.create({baseURL});
import request from '@/utils/request.js'
// 获取所有文章信息函数
export function articleGetAllService(){
    return request.get("/article/getAll");
}
// 根据文章分类和发布状态搜索文章函数
export function articleSearchService(searchConditions){
    return request.get("/article/search",{params:searchConditions}); 
}