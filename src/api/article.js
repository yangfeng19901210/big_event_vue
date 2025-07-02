import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'
// 获取所有文章信息函数
export function articleGetAllService(){
    return request.get("/article/getAll");
}
// 根据文章分类和发布状态搜索文章函数
export function articleSearchService(searchConditions){
    return request.get("/article/search",{params:searchConditions}); 
}
// 文章分类列表查询
export const articleCategoryListService = ()=>{
    const tokenStore = useTokenStore();
    // 在pinia中定义的响应式数据,都不需要.value
    return request.get('/category',{headers:{'Authorization':tokenStore.token}});
}