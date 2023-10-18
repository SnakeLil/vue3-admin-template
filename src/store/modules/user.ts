// 用户相关
import {loginForm,loginRes} from '@/api/user/type'
import { defineStore} from 'pinia'
import {login} from '@/api/user'
import {UserState} from './types/types'
import {getLocalToken,setLocalToken} from '@/utils/token'
import {constantRoutes} from '@/router/routes'
let useUserStore = defineStore('user',{
    state:():UserState =>{
        return {
            token:getLocalToken(),
            menuRoutes:constantRoutes,
        }
    },

    actions:{
        async userLogin(user:loginForm){
           let res:loginRes = await login(user)
            console.log(res)
           if(res.code === 200){
               this.token = (res.data.token as string)
            //    本地存储
            setLocalToken(res.data.token as string)
           }else{
            return Promise.reject(new Error(res.data.message))
           }
        },
        Userlogout(){
            localStorage.removeItem('vue_template_token')
            this.token = ''
        }

    },

    getters:{

    }
})
export default useUserStore