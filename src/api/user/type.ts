//定义ts数据类型
export interface loginForm {
    username: string;
    password: string;
}

export interface loginRes {
    code: number;
    data: {
        token?: string;
        message?: string;
    };
}

export interface userInfo {
    code:number,
    data:{
        checkUser:{
            userId: number,
            avatar:string,
            username: string,
            password: string,
            desc: string,
            roles: string[],
            buttons: string[],
            routes: string[],
            token: string,
        }
    }
}