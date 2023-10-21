// 用户相关

import { defineStore } from 'pinia'
import { login, getUserInfo, logout } from '@/api/user'
import { loginForm,loginResData,userInfoResData } from '@/api/user/type'
import { UserState } from './types/types'
import {
    getLocalToken, setLocalToken,
    setUsername, setUserAvatar, setUserRoles,
    getUsername, getUserAvatar, getUserRoles
} from '@/utils/token'
import { constantRoutes } from '@/router/routes'
let useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            token: getLocalToken(),
            avatar: '',
            username: '',
            roles: [],
            menuRoutes: constantRoutes,
        }
    },

    actions: {
        async userLogin(user: loginForm) {
            let res: loginResData = await login(user)
            if (res.code === 200) {
                this.token = (res.data as string)
                //    本地存储
                setLocalToken(res.data as string)
            } else {
                return Promise.reject(new Error(res.data))
            }
        },
        // 获取用户信息
        async UserInfo() {
            let res:userInfoResData= await getUserInfo()
            if (res.code === 200) {
                this.username = res.data.name
                this.avatar = res.data.avatar
                this.roles = res.data.roles
                // 本地存储

                // setUsername(res.data.checkUser.username)
                // setUserAvatar(res.data.checkUser.avatar)
                // setUserRoles(res.data.checkUser.roles)
                return 'ok'
            } else {
                return Promise.reject(new Error(res.message))
            }
        },
        async Userlogout() {
            let res:any = await logout()
            if (res.code === 200) {
                // 退出成功
                this.token = ''
                this.avatar = ''
                this.username = ''
                this.roles = []
                localStorage.removeItem('vue_template_token')
                return 'ok'
            }else {
                return Promise.reject(new Error(res.message))
            }

            // localStorage.removeItem('vue_template_username')
            // localStorage.removeItem('vue_template_avatar')
            // localStorage.removeItem('vue_template_roles')
            // localStorage.removeItem('vue_template_desc')

        }

    },

    getters: {

    }
})
export default useUserStore