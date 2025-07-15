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
// 添加文章分类
export const articleCategoryAddService = (categoryModel)=>{
    return request.post('/category',categoryModel);
}
// 文章分类修改
export const articleCategoryUpdateService = (categoryModel)=>{
    return request.put('/category',categoryModel);
}
//删除文章分类
export const articleCategoryDeleteService = (id)=>{
    return request.delete('/category?id='+id);
}
// 文章分类列表查询
export const articleCategoryListService = ()=>{
    const tokenStore = useTokenStore();
    // 在pinia中定义的响应式数据,都不需要.value
    // return request.get('/category',{headers:{'Authorization':tokenStore.token}}); 已在请求拦截器中添加token，所以具体接口中不需要添加了
    return request.get('/category');
}

//分页获取文章列表
export const articlePageService = (pageQuery)=>{
    return request.post('/article/getPageData',pageQuery);
}

// 文章添加
export const articleAddService = (articleData)=>{
    return request.post('/article',articleData);
}

// 文章修改
export const articleUpdateService = (articleModel)=>{
    return request.put('/article',articleModel);
}
// 删除文章信息
export const articleDeleteService = (id)=>{
    return request.delete('/article?id='+id);
}