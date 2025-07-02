import './assets/main.scss'

import { createApp } from 'vue'
// 引入App.vue文件
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
// 导入pinia
import {createPinia} from 'pinia';
const pinia = createPinia();
// 引入汉化插件
import locale from "element-plus/dist/locale/zh-cn.js"
// 创建一个新的vue应用实例
const app = createApp(App)
// 新的vue应用实例使ElementPlus和用汉化插件
app.use(router);
// 使用pinia
app.use(pinia);
app.use(ElementPlus,{locale})
// 将新建的vue应用实例绑定到index.html中id为app的页面元素上
app.mount('#app')
