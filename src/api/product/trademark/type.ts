// 品牌接口数据；类型

export interface ResData {
    code: number;
    message: string;
    ok: boolean;
}

// 品牌数据类型
export interface Trademark {
    id?: number;
    tmName: string;
    logoUrl: string;

}
//品牌数组
export type Records = Trademark[];

// data中的数据
export interface TrademarkList extends ResData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    },

}