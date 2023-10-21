// 封装本地存储的token数据读取和操作

export const getLocalToken = () => {
    return localStorage.getItem('vue_template_token')
}

export const setLocalToken = (token: string) => {
    localStorage.setItem('vue_template_token', token)
}
// username
export const setUsername = (username:string) => {
    localStorage.setItem('vue_template_username', username)
}
export const getUsername = () => {
    return localStorage.getItem('vue_template_username')
}
// 头像
export const setUserAvatar = (avatar:string) => {
    localStorage.setItem('vue_template_avatar', avatar)
}
export const getUserAvatar = () => {
    return localStorage.getItem('vue_template_avatar')
}
// roles
export const setUserRoles = (roles:any) => {
    localStorage.setItem('vue_template_roles', roles)
}
export const getUserRoles = () => {
    return localStorage.getItem('vue_template_roles')
}
// desc
export const setUserDesc = (desc:string) => {
    localStorage.setItem('vue_template_desc', desc)
}
export const getUserDesc = () => {
    return localStorage.getItem('vue_template_desc')
}
