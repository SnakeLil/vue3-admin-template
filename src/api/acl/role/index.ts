import request from '@/utils/request'
import {roleListResData,roleType,menuType} from './type'

enum API {
    // 角色列表
    getRoleList = '/admin/acl/role/',
    // 新增角色
    addRole = '/admin/acl/role/save',
    // 修改角色
    updateRole = '/admin/acl/role/update',
    // 根据角色获取权限
    getRoleMenu = '/admin/acl/permission/toAssign/',
    // 分配角色菜单权限
    assignRoleMenu = '/admin/acl/permission/doAssign',
    // 删除角色
    deleteRole = '/admin/acl/role/remove/',
}

// 获取所有角色列表
export const getRoleList = (page:number,limit:number,roleName:string) => request.get<any,roleListResData>(API.getRoleList+`${page}/${limit}/?roleName=${roleName}`)

// 新增角色
export const addOrUpdateRole = (role:roleType) => {
    if(!role.id) {
        // 没有id，添加
        return request.post<any,any>(API.addRole,role)
    }else {
        // 携带id，修改
        return request.put<any,any>(API.updateRole,role)
    }
}
// 根据角色获取菜单
export const getRoleMenu = (id:number) => request.get<any,menuType>(API.getRoleMenu+id)

// 分配角色菜单权限
export const assignRoleMenu = (roleId:number,permissionIds:number[]) => {
    return request.post<any,any>(API.assignRoleMenu+`?roleId=${roleId}&permissionId=${permissionIds}`)
}
// 删除角色
export const deleteRoleReq = (id:number) => request.delete<any,any>(API.deleteRole+id)