// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入汉化插件
import locale from "element-plus/dist/locale/zh-cn.js"

const app = createApp(App)
// 使用汉化插件
app.use(ElementPlus,{locale})
app.mount('#app')
