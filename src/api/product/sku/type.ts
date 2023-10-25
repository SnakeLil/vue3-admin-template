import {SkuData} from '@/api/product/spu/type'
export interface res {
    code:number,
    message:string,
    ok:boolean,
}
export interface skuListResData extends res{
    data:{
        countId?: any
        current: number
        hitCount: boolean
        maxLimit?: any
        optimizeCountSql: boolean
        orders?: []
        pages: number
        records: SkuData[]
        searchCount?: boolean
        size: number
        total: number
    }
}