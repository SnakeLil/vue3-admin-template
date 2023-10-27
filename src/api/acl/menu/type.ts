export interface res {
    code:number,
    message:string,
    ok:boolean,
}
export interface permission {
        id?: number|string,
        createTime?: string,
        updateTime?:string,
        pid?: number|string,
        name:string,
        code?: any,
        toCode?: any,
        type?: number,
        status?: any,
        level:number,
        children?:any[],
        select?:boolean
}
export interface permissionResData extends res {
    data:permission[]
}