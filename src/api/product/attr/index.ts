// 属性相关接口
import  request  from '@/utils/request';
import type {categoryResDta,AttrResData,Attr} from './type'
enum API {
    // 获取已有属性的接口
    ATTR_ONE_LIST = '/admin/product/getCategory1',
    ATTR_TWO_LIST = '/admin/product/getCategory2/',
    ATTR_THREE_LIST = '/admin/product/getCategory3/',
    ADD_UPDATE_ATTR = '/admin/product/saveAttrInfo',
    UPDATE_ATTR = '',
    DELETE_ATTR = '/admin/product/deleteAttr/',
    ATTR_INFO_LIST = '/admin/product/attrInfoList/',
}
// 获取一级分类列表
export const getAttrOneList = () => request.get<any,categoryResDta>(API.ATTR_ONE_LIST);
// 获取二级分类
export const getAttrTwoList = (category1Id: number | string) => request.get<any,categoryResDta>(API.ATTR_TWO_LIST + category1Id);
// 获取三级分类
export const getAttrThreeList = (category2Id: number | string) => request.get<any,categoryResDta>(API.ATTR_THREE_LIST + category2Id);
// 根据三个分类获取商品属性
export const getAttrInfoList = (category1Id: number | string, category2Id: number | string, category3Id: number | string) =>
request.get<any,AttrResData>(API.ATTR_INFO_LIST + category1Id + '/' + category2Id + '/' + category3Id);
// 新增或修改属性
export const addOrUpdateAttr = (data: Attr) =>
request.post<any,any>(API.ADD_UPDATE_ATTR, data);

// 删除属性
export const deleteAttr = (id:number)=>request.delete<any,any>(API.DELETE_ATTR+id)