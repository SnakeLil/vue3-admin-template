import request from '@/utils/request'
import type {permissionResData} from './type'

enum API {
    //获取全部权限
    getPermissionList = '/admin/acl/permission',
    // 新增菜单
    addPermission = '/admin/acl/permission/save',
    // 修改菜单
    updatePermission = '/admin/acl/permission/update',


    // 删除某个权限菜单
    deletePermission = '/admin/acl/permission/remove/',
}
//获取全部权限
export const getMenuList = () => {
    return request.get<any,permissionResData>(API.getPermissionList)
}
// 删除某个权限菜单
export const deletePermission = (id:number) => {
    return request.delete<any,permissionResData>(API.deletePermission + id)
}
// 新增菜单/修改
export const addOrUpdatePermission = (data:any) => {
    if(data.id) {
        // 修改
        return request.put<any,any>(API.updatePermission,data)
    }else {
        // 新增
        return request.post<any,any>(API.addPermission,data)
    }
}