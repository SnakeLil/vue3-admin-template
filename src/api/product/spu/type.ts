// spu 类型


export interface SpuResData {
    code: number;
    message: string;
    data: Data;
    ok: boolean;
}

export interface spuData {
    id?: number;
    spuName: string;
    description: string;
    category3Id: number | string;
    tmId: number;//品牌
    spuSaleAttrList?: any;
    spuImageList?: any;
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
    id: number,
    createTime: string,
    updateTime: string,
    imgName: string,
    imgUrl: string,
    spuId: number,
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
    createTime: any,
    updateTime: any,
    spuId: number,
    baseSaleAttrId: number,
    saleAttrName: string,
    saleAttrValueName: string,
    isChecked: any,
}
export interface SpuSaleAttr {
    id?: number,
    createTime: any,
    updateTime: any,
    spuId: number,
    baseSaleAttrId: number,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrValue[],

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