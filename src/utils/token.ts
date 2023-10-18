// 封装本地存储的token数据读取和操作

export const getLocalToken = () => {
    return localStorage.getItem('vue_template_token')
}

export const setLocalToken = (token: string) => {
    localStorage.setItem('vue_template_token', token)
}