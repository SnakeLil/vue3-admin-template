import type {category} from '@/api/product/attr/type.ts'
export interface UserState {
    token:string | null,
    menuRoutes:any,
    avatar:string | null,
    username:string | null,
    roles:string[] |any,
}
// 定义category 仓库state的类型
export interface CategoryState {
    c1Id: string | number,
    c2Id: string | number,
    c3Id: string | number,
    c1Arr:category[],
    c2Arr:category[],
    c3Arr:category[],
}