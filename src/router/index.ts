// 通过vue-router 实现路由配置
import {constantRoutes} from './routes.ts'
import {createRouter,createWebHistory} from 'vue-router'

let router = createRouter({
    history:createWebHistory(),
    //@ts-ignore
    routes:constantRoutes,
    scrollBehavior(){
        return {
            left:0,
            top:0
        }
    }

});

export default router