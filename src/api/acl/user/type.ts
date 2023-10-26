export interface res {
    code:number,
    message:string,
    ok:boolean,
}

export interface userInfo {
    createTime?:string,
    id?:number| string,
    name:string,
    password:string,
    phone?:string,
    roleName?:string,
    updateTime?:string,
    username:string,

}

export interface userResData extends res {
    data:{
        countId?:number,
        current:number,
        size:number,
        total:number,
        hitCount?:boolean,
        records:userInfo[],
        maxLimit?:number,
        optimizeCountSql?:boolean,
        orders:any[],
        pages?:number|string,
        searchCount?:boolean,
    }
}

// 一个账号信息
export interface user {
    id?:number|string,
    name?:string,
    password:string,
    phone?:string,
    roleName?:string,
    username:string,
    createTime?:string,
    updateTime?:string,
}
export interface AOrUResData extends res {
    data:user
}
// 给用户分配角色 的ts类型
export interface userRole {
    roleIdList:any[],
    userId:string|number,
}