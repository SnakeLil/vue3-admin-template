export const getTime = () =>{
    let message = ''
    let hours = new Date().getHours()

    message = hours>=0&&hours<6?
    '夜深了噢~':
    hours>=6&&hours <=12 ? 
    '上午好~'
    :hours>12&&hours<=14? 
    '中午好~'
    : hours>14&&hours<18?
    '下午好~'
    :hours>=18&&hours<=24?
    '晚上好~':'你好'

    return message
}