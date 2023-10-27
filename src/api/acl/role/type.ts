export interface res {
    code:number,
    message:string,
    ok:boolean,
}

export interface roleType {
        id?: number,
        createTime?:string,
        updateTime?: string,
        roleName?: string,
        remark?: any
}
export interface roleListResData extends res{
    data:{
        records: roleType[],
        total: number,
        size: number,
        current: number,
        orders: any[],
        optimizeCountSql?: boolean,
        hitCount?: boolean,
        countId?: any,
        maxLimit?: any,
        searchCount?: boolean,
        pages?: number
    },
}