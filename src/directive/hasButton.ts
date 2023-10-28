import pina from '@/store'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore(pina)
export const isHasButton = (app:any)=>{
    // 全局自定义指令
    app.directive('hasButton',{
        mounted(el:any,option:any){
            // el：使用了此自定义指令v-isHasButton的实例，
            //option.value：自定义指令等号后的值
            if(!userStore.buttons.includes(option.value)) {
                // 如果用户返回的数据中buttons数组，不存在自定义指令后，即option.value的值，则从dom中删掉它
                el.parentNode.removeChild(el);
                //（实例的父节点调用removeChild，传入该实例 达到删除自身的功能）
            }
        }
    })
}