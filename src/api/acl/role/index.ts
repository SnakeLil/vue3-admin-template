import request from '@/utils/request'
import {roleListResData,} from './type'

enum API {
    // 角色列表
    getRoleList = '/admin/acl/role/',
}

// 获取所有角色列表
export const getRoleList = (page:number,limit:number,roleName:string) => request.get<any,roleListResData>(API.getRoleList+`${page}/${limit}/?roleName=${roleName}`)