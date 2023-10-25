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