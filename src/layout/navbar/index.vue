<template>
    <div class="navbar">
        <div class="left">
            <!-- 左侧区域 -->
            <Breadcrumb />
        </div>
        <div class="right">
            <!-- 右侧区域 -->
            <User/>
        </div>
    </div>
</template>

<script setup lang="ts">

import Breadcrumb from './breadcrumb/index.vue'
import User from './user/index.vue'
</script>

<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;

    .left {

    }


    .right {
        display: flex;
        align-items: center;
        gap: 15px;


    }
}
</style>