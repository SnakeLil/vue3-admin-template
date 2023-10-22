export interface resData{
    code:number,
    message:string,
    ok:boolean,


}
export interface category{
    id:number | string,
    name:string,
    category1Id?:number,
    category2Id?:number,
}
export interface categoryResDta extends resData {
    data:category[]
}
// 属性与属性值接口返回的 数据类型
export interface attrValue{
    id?:number,
    valueName:string,
    attrId?:number,
}
// 属性值数组
export type AttrValueList = attrValue[];

// 属性对象
export interface Attr {
    id?: number,
    attrName: string,
    categoryId: number | string,
    categoryLevel: number,
    attrValueList:AttrValueList
}
// 存储属性的数组
export type AttrList = Attr[];

export interface AttrResData extends resData {
    data:AttrList
}