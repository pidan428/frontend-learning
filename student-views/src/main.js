import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入 Element Plus 组件库和样式（文档要求使用 Element Plus，需先注册）
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')

