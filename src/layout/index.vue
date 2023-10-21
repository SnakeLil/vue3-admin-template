<template>
    <div class="layout-container">
        <div class="layout-left">
            <logo></logo>
            <div class="menu">
                <Menu :menuList="useStore.menuRoutes"></Menu>
            </div>

        </div>
        <div class="layout-right">

            <div class="layout-nav">
                <!-- 顶部导航 -->
                <Navbar />
            </div>
            <div class="layout-content">
                <!-- 内容区 -->

                <Main></Main>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import Main from './main/index.vue'
import logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import useUserStore from '@/store/modules/user.ts'
import Navbar from './navbar/index.vue'
let useStore = useUserStore()
</script>

<style scoped lang="scss">
.layout-container {
    width: 100%;
    height: 100vh;
    display: flex;

    .layout-left {
        padding: 20px;
        width: $menu-width;
        height: 100%;
        background-color: rgb(255, 255, 255);
        border-right: 1px solid #d0cfcf;

        .menu {
            padding: 33.5px 0;
            width: 100%;
            height: 100%;

            overflow: auto;

            .el-menu {
                border-right: none;
                border-top: 1px solid rgb(189, 187, 187);
            }
        }

        ::-webkit-scrollbar {
            width: 7x;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 10px;
            height: 50px;
            background: #888;
        }


    }

    .layout-right {
        display: flex;
        flex-direction: column;

        .layout-nav {
            width: calc(100vw - $menu-width);
            height: $nav-height;

        }

        .layout-content {
            padding: 20px;
            width: calc(100vw - $menu-width);
            height: calc(100vh - $nav-height);
           
            overflow: auto;
        }


    }


}
</style>