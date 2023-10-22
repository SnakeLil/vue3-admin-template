// 品牌管理模块的接口
import  request  from '@/utils/request';
import{TrademarkList,Trademark} from './type'
enum API {
    // 获取已有品牌的接口
    TRADEMARK_LIST = '/admin/product/baseTrademark/',
    ADD_TRADEMARK = '/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK = '/admin/product/baseTrademark/update',
    DELETE_TRADEMARK = '/admin/product/baseTrademark/remove/',
}

// 接口方法
// page:第几页
// limit：第几个
export const TrandemarkList = (page:number,limit:number)=>{
    return request.get<any,TrademarkList>(API.TRADEMARK_LIST+`${page}/${limit}`);
}
// 添加或修改
export const AddOrUpdateTrademark = (data:Trademark)=>{
    if(data.id) {// 修改品牌信息
        return request.put<any,any>(API.UPDATE_TRADEMARK,data);
    }else {// 添加品牌
        return request.post<any,any>(API.ADD_TRADEMARK,data);
    }
   
}

// 删除
export const deleteTrandemark = (id:number)=>{
    return request.delete<any,any>(API.DELETE_TRADEMARK+id);
}

