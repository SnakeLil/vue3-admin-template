// spu 类型
export interface res {
    code:string,
    message:string,
    ok:boolean,
}

export interface SpuResData {
    code: number;
    message: string;
    data: Data;
    ok: boolean;
}
//spu 新增/修改需要传入的数据类型  ,spu对象的 数据类型
export interface spuData {
    id?:number
    spuName: string;
    tmId: number | string;//品牌
    description: string;
    category3Id: number | string;
    spuImageList:SpuImage[] | null
    spuSaleAttrList:SpuSaleAttr[] | null
}
export interface Data {
    records: spuData[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
}






// 品牌数据的类型
export interface Trademark {
    id: number,
    tmName: string,
    logoUrl: string,
}
// 品牌
export interface TrademarkResData {
    code: number;
    message: string;
    data: Trademark[];
    ok: boolean;
}
// spu下的图片列表的数据类型
export interface SpuImage {
    id?: number,
    createTime?: string,
    updateTime?: string,
    imgName?: string,
    imgUrl?: string,
    spuId?: number,
    name?: string,
    url?: string,
}
export interface SpuImageResData {
    code: number;
    message: string;
    data: SpuImage[];
    ok: boolean;
}

// spu的销售属性列表返回的类型
export interface SpuSaleAttrValue {
    id?: number,
    createTime?: any,
    updateTime?: any,
    spuId?: number,
    baseSaleAttrId: number,
    saleAttrName: string,
    saleAttrValueName?: string,
    isChecked?: any,
}
export interface SpuSaleAttr {
    id?: number,
    createTime?: any,
    updateTime?: any,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrValue[],
    flag?: boolean,
    saleAttrValue?: string,
}
export interface SpuSaleAttrResData {
    code: number;
    message: string;
    data: SpuSaleAttr[];
    ok: boolean; 
}
// 全部销售属性数据类型
export interface AllSaleAttrResData {
    code: number;
    message: string;
    data: SaleAttrValue[];
    ok: boolean;
}
// 单个销售属性数据类型
export interface SaleAttrValue {
    id?: number,
    name:string,
}
// 添加sku接口的数据类型
export interface SkuData {
    id?:number |string,
    category3Id: number|string,
    spuId: number|string,
    tmId: number|string,
    skuName: string,//sku名
    price: number|string,
    weight: number|string,
    skuDesc: string,
    skuAttrValueList?: SkuAttrValue[],//平台属性
    skuSaleAttrValueList?:SkuSaleValue[],
    skuDefaultImg:string,//图片地址
    isSale?:number |string
}
//平台属性的属性值
export interface SkuAttrValue {
    attrId: number|string,//平台属性id
    valueId: number|string,//属性值id
    // attrName: string,
    // id:number,
    // skuID: number,
    // valueName: string,
}
// 销售属性
export interface SkuSaleValue {
    saleAttrId: number|string,//属性id
    saleAttrValueId: number|string,//属性值id

}

