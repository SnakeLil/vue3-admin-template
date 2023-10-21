import { defineStore } from "pinia";

let useSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            //控制刷新
            refresh: false,
        }
    }
})
export default useSettingStore