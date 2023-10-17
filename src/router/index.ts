// 通过vue-router 实现路由配置
import {constantRoutess} from './routes.ts'
import {createRouter,createWebHistory} from 'vue-router'
//@ts-ignore
let router = createRouter({
    history:createWebHistory(),
    routes:constantRoutess,
    scrollBehavior(){
        return {
            left:0,
            top:0
        }
    }

});

export default router