<template>
    <div class="icons">
        <el-button :icon="Refresh" circle size="default" :loading="false" @click="refreshHandler"/>
        <el-button :icon="FullScreen" circle size="default" @click="fullScreenHandler"/>
        <el-button :icon="Setting" circle size="default" />
    </div>

    <div class="user">
        <img :src="userStore.avatar" alt="">
        <el-dropdown>
            <span class="el-dropdown-link">
                {{ userStore.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :icon="SwitchButton" @click="logoutHandler">退出登录</el-dropdown-item>
                    <el-dropdown-item :icon="CircleCheck">更多</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Refresh, FullScreen, Setting, SwitchButton, CircleCheck } from '@element-plus/icons-vue'
import useSettingStore from '@/store/modules/setting'
import  useUserStore from '@/store/modules/user.ts'
let $route = useRouter()
let SettingStore = useSettingStore()
const refreshHandler = ()=>{
    SettingStore.refresh = !SettingStore.refresh
}
const fullScreenHandler = ()=>{
    // 判断当前页面是否全屏,fullscreenElement会返回是否全屏 
    let full = document.fullscreenElement
    if(!full){
        document.documentElement.requestFullscreen()
    }else {
        document.exitFullscreen()
    }
}
let userStore = useUserStore()
onMounted(()=>{
    
})
const logoutHandler = async ()=>{
    await userStore.Userlogout()
    $route.push({path:'/login',})
}
</script>

<style scoped lang="scss">
        .icons {
            display: flex;
            align-items: center;

        }

        .user {
            display: flex;
            align-items: center;
            gap: 15px;

            img {
                width: 35px;
                height: 35px;
                border-radius: 50%;

            }

        }
</style>