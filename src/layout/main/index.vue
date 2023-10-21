<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag"/>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import {watch,ref,nextTick} from 'vue'
import useSettingStore from '@/store/modules/setting'
let SettingStore = useSettingStore()
let flag = ref(true)
watch(()=>SettingStore.refresh,()=>{
    flag.value = false
    nextTick(()=>{
        flag.value = true
    })
})
</script>

<style scoped lang="scss">

.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {
    transition: all 0.5s ease;
}
.fade-leave-to {
    opacity: 1;
}
</style>