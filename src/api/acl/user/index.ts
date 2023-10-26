import request from '@/utils/request'
import {userResData,user,userRole} from './type'
enum API {
    // 获取全部用户信息
    ALL_USER = '/admin/acl/user/',
    // 新增用户
    ADD_USER = '/admin/acl/user/save',
    // 修改用户
    UPDATE_USER = '/admin/acl/user/update',
    // 获取所有角色
    All_ROLES= '/admin/acl/user/toAssign/',
    // 根据用户分配角色
    ASSIGN_ROLES = '/admin/acl/user/doAssignRole',
}


// 获取全部用户信息列表（分页）
export const getAllUser = (page:number,limit:number) => {
    return request.get<any,userResData>(API.ALL_USER+`${page}/${limit}`)
}
// 新增用户
export const addOrUpdateUser = (user:user) => {
    if(user.id) {
        // 修改
        return request.put<any,any>(API.UPDATE_USER,user)
    }else {
        return request.post<any,any>(API.ADD_USER,user)
    }
}
// 获取所有角色信息
export const getAllRoles = (adminId:number) => {
    return request.get<any,any>(API.All_ROLES+adminId)
}
 // 根据用户分配角色
 export const assignRoles = (setRoleData:userRole) => {
    return request.post<any,any>(API.ASSIGN_ROLES,setRoleData)
 }