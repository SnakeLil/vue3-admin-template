import SvgIcon from '@/components/SvgIcon/index.vue'

const allGlobalComponents = {
    SvgIcon,
}
// 对外暴露插件对象
export default {
    // 一定要使用install方法，app使用时会执行
    install(app:any){
        Object.keys(allGlobalComponents).forEach(key=>{
            app.component(key,allGlobalComponents[key])
        })
    }
}