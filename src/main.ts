import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from '@/App.vue'
// svg插件配置
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import '@/styles/index.scss'
import router from './router'
import pinia from './store'
import './permission'
const app = createApp(App)

app.use(ElementPlus,{
    locale: zhCn,
  } )
app.use(globalComponent)

app.use(router)

app.use(pinia)

app.mount('#app')
