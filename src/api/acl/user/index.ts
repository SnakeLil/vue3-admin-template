import request from '@/utils/request'
import {userResData} from './type'
enum API {
    // 获取全部用户信息
    ALL_USER = '/admin/acl/user/'
}


// 获取全部用户信息列表（分页）
export const getAllUser = (page:number,limit:number) => {
    return request.get<any,userResData>(API.ALL_USER+`${page}/${limit}`)
}