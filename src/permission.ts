// 路由鉴权
import pinia from './store'
import useUserStore from './store/modules/user'
import router from '@/router'
import nprogress from 'nprogress'

// 引入进度条样式
import 'nprogress/nprogress.css'

// 全局首位：项目中任意路由切换都会触发的钩子
let userStore = useUserStore(pinia)
// 添加全局前置首位
router.beforeEach(async (to, from, next) => {
    // 访问某个路由之前守卫
    // to：访问对象，from：，mext：路由放行函数
    nprogress.start()
    let token = userStore.token
    let username = userStore.username
    if (token) {
        //已登录
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (username) {
                // 已登录情况下访问路由，判断是否有用户信息
                // try {
                //     await userStore.UserInfo()
                //     next()
                // } catch (err) {
                //     // token过期/无效/修改
                //     userStore.Userlogout()
                //     next({ path: '/login' })
                // }
                next()
            } else {
                // 没有则重新获取信息
                try {
                    await userStore.UserInfo()
                    next({...to})
                } catch (err) {
                    // token过期/无效/修改
                    await userStore.Userlogout()
                    next({ path: '/login'})
                }

            }
        }

    } else {
        // 未登录
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }

})


// 全局后置首位
router.afterEach((to, from) => {
    document.title = to.meta.title
    nprogress.done()
})

// 1. 路由切换实现进度条业务nprogress
// 2. 路由组件访问权限、


// 用户未登录：无法访问其它页面
// 已登录：不能访问登录页面-重定向->首页
