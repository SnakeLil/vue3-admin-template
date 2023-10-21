//定义ts数据类型
export interface loginForm {
    username: string;
    password: string;
}

// 定义全部接口返回的类型
export interface ResData {
    code:number,
    message:string,
    ok:boolean
}

// 登录返回
export interface loginResData extends ResData {
    data:string
}
// 获取用户信息返回
export interface userInfoResData extends ResData {
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string,
    }
}

// 退出登录返回

export interface loginRes {
    code: number;
    data: {
        token?: string;
        message?: string;
    };
}

// export interface userInfo {
//     code:number,
//     data:{
//         checkUser:{
//             userId: number,
//             avatar:string,
//             username: string,
//             password: string,
//             desc: string,
//             roles: string[],
//             buttons: string[],
//             routes: string[],
//             token: string,
//         }
//     }
// }