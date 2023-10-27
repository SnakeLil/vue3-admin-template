export interface res {
    code:number,
    message:string,
    ok:boolean,
}

export interface roleType {
        id?: number|string,
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

// 菜单数据
export interface menuData {
    id: number |string,
      createTime: string,
      updateTime: string,
      pid: number,
      name: string,
      code: any,
      toCode: any,
      type: number,
      status: any,
      level: number,
      children:any[]
}
// 菜单返回
export interface menuType extends res {
    data:menuData[]
}
