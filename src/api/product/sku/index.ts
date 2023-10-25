import  request  from '@/utils/request';
import type {skuListResData} from './type'
enum API {
    SKU_LIST = '/admin/product/list/',
    // 商品上架
    SKU_ON_SALE = '/admin/product/onSale/',
    //商品下架
    SKU_OFF_SALE = '/admin/product/cancelSale/',
    // 根据商品sku id 拿商品信息
    SKU_INFO = '/admin/product/getSkuInfo/',
    // 删除sku
    SKU_DEL = '/admin/product/deleteSku/',
}
// 获取sku列表
export const getSkuList = (page:number,limit:number) => request.get<any,skuListResData>(API.SKU_LIST+`${page}/${limit}`);
// 上架
export const onSale = (skuId:number) => request.get<any,any>(API.SKU_ON_SALE+skuId);
//下架
export const offSale = (skuId:number) => request.get<any,any>(API.SKU_OFF_SALE+skuId);
//  根据商品sku id 拿商品信息
export const getSkuInfo = (skuId:number) => request.get<any,any>(API.SKU_INFO+skuId);
// 删除sku
export const delSku = (skuId:number) => request.delete<any,any>(API.SKU_DEL+skuId);