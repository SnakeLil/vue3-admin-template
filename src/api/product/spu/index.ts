// spu相关接口
import  request  from '@/utils/request';
import type {spuData,SpuResData,TrademarkResData,SpuImageResData,SpuSaleAttrResData,AllSaleAttrResData,SkuData} from './type'
enum API {
    SPU_LIST = '/admin/product/',

    SPU_ADD = '/admin/product/saveSpuInfo', 
    SPU_UPDATE = '/admin/product/updateSpuInfo',
    SPU_DELETE = '/admin/product/deleteSpu/{spuId}',

    SPU_INFO = '/admin/product/getSpuById/{spuId}',

    ALL_TRADEMARK_LIST = '/admin/product/baseTrademark/getTrademarkList',
    SPU_IMAGE_LIST = '/admin/product/spuImageList/',
    SPU_SALE_LIST = '/admin/product/spuSaleAttrList/',
    ALL_SALE_ATTR_LIST = '/admin/product/baseSaleAttrList',
    ADD_SKU_FOR_SPU = '/admin/product/saveSkuInfo',
}
// 获取spu列表（根据页码，每页数）
export const getSpuList = (page: number, limit: number,category3Id:number|string) => {
    return request.get<any,SpuResData>(API.SPU_LIST+page+'/'+limit+'?category3Id='+category3Id);
}
// 获取全部品牌哦
export const getAllTrademarkList = () => {
    return request.get<any,TrademarkResData>(API.ALL_TRADEMARK_LIST);
}
// 获取某个spu下的所有sku图片列表
export const getSpuImageList = (spuId: number) => {
    return request.get<any,SpuImageResData>(API.SPU_IMAGE_LIST+spuId);
}
// 根据id获取某个spu的销售属性列表
export const getSpuSaleList = (spuId: number) => {
    return request.get<any,SpuSaleAttrResData>(API.SPU_SALE_LIST+spuId);
}
// 获取全部销售属性
export const getAllSaleAttrList = () => {
    return request.get<any,AllSaleAttrResData>(API.ALL_SALE_ATTR_LIST);
}
// 添加spu,// 修改/更新spu
export const addOrUpdateSpu = (spuInfo: spuData) => {
    if(spuInfo.id) {
        return request.post<any,any>(API.SPU_UPDATE,spuInfo);
    }else {
        return request.post<any,any>(API.SPU_ADD,spuInfo);
    }
}
// 为某个spu添加sku(参数：3级分类id，spuid，品牌id，sku)
export const addSkuForSpu = (data:SkuData) => {
    return request.post<any,any>(API.ADD_SKU_FOR_SPU,data); 
}
