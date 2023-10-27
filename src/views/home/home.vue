<template>
    <div style="display: flex;flex-direction: column;align-items: center;">
        <h1 class="title" >WELCOM TO LILSNAKE</h1>
        <el-card style="width: 100%;margin-top: 60px;">
            <div style="display: flex;align-items: center;gap: 40px;">
                <!-- <img :src="(userStore.avatar as string)" alt="" style="width: 100px;height: 100px;border-radius: 50%;"> -->
                <img src="https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/gp/wallhaven-gpmjxe.png?w=2560&h=1440&fmt=webp" alt="" style="width: 100px;height: 100px;border-radius: 50%;">
            
            <span style="font-size: 24px; font-weight: bold;">{{ userStore.username }}</span>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
onMounted(()=>{

    // userStore.UserInfo()
    
})
</script>

<style scoped lang="scss">
.title {
    font-size: 34px;
    font-weight: bold;
    text-shadow: 0 0 10px #a1a1a1;
    color: white;
    -webkit-box-reflect: below 2px linear-gradient(transparent, rgba(0, 0, 0, .5));
    
}
img{
    object-fit: cover;
}

</style>