// 导入axios库
import axios from 'axios'
//定义变量记录公共前缀
const baseURL = "http://localhost:8070";
const instance = axios.create({baseURL});
// 获取所有文章信息函数
export async function articleGetAllService(){
    return await instance.get("/article/getAll")
    .then(result=>{
        // 保存数据
        return result.data;
    })
    .catch(err=>{
        log.info(err);
    });
}
// 根据文章分类和发布状态搜索文章函数
export async function articleSearchService(searchConditions){
    return await instance.get("/article/search",{params:searchConditions})
       .then(result=>{
            // 保存数据
            return result.data;
       })
       .catch(err=>{
            log.info(err);
       }); 
}