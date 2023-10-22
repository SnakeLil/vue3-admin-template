import SvgIcon from '@/components/SvgIcon/index.vue'
import Category from './category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponents = {
    SvgIcon,
    Category
}
// 对外暴露插件对象
export default {
    // 一定要使用install方法，app使用时会执行
    install(app:any){
        Object.keys(allGlobalComponents).forEach(key=>{
            app.component(key,allGlobalComponents[key])
        })
        // 将element plus图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}