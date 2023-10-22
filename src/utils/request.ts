import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from '@/store/modules/user'
const request = axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:8000,

})
//添加请求拦截器
request.interceptors.request.use((config)=>{
    // 获取用户相关仓库，获取token，登录成功后携带此token发送请求
    const userStore = useUserStore()
    if(userStore.token){
        config.headers.token = userStore.token
    }
    return config
})

// 添加相应拦截器
request.interceptors.response.use((res)=>{
    // 成功回调
    return res.data
},(err)=>{
    // 失败回调
    let message = ''
    let status = err.response.status
    switch (status) {

        case 400:
            message = '请求错误'
            break
        case 401:
            message = '未授权，请登录'
            break
        case 403:
            message = '拒绝访问'
            break
        case 404:
            message = '请求地址出错'
            break
        case 408:
            message = '请求超时'
            break
        case 500:
            message = '服务器内部错误'
            break
        case 501:
            message = '服务未实现'
            break
        default:   
            message = '连接错误'
            break
    }

    ElMessage({
        type:'error',
        message
    })

    return Promise.reject(err) 
})

export default request;