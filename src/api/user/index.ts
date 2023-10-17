// 统一管里项目用户相关的接口

import request from '@/utils/request'
import { loginForm,loginRes,userInfo } from '@/api/user/type'

//枚举请求地址，（定义常量）
enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info',
}
// 暴露请求函数
// 登录
export const login = (data:loginForm) => request.post<any,loginRes>(API.LOGIN_URL, data)

// 获取用户信息
export const getUserInfo = () => request.get<any,userInfo>(API.USERINFO_URL) 