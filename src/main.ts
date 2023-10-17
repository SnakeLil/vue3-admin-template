import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from '@/App.vue'
// svg插件配置
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(ElementPlus,{
    locale: zhCn,
  } )

import globalComponent from '@/components'
app.use(globalComponent)

// 全局默认样式
import '@/styles/index.scss'
// 挂载


app.mount('#app')
