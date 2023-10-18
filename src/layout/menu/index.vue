<template>
    <div class="menu">
        <el-menu default-active="2" class="el-menu-vertical-demo">
            <template v-for="(item,index) in menuList" :key="item.path">
                <el-menu-item :index="item.path" v-if="!item.children">
                <template #title>
                    <span>{{ item.meta,title }}</span>
                </template>
                </el-menu-item>
                
                <!-- <el-sub-menu index="3" >
                    <template #title><span>Navigator One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                    <el-menu-item-group title="Group Two">
                        <el-menu-item index="1-3">item three</el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu> -->
            </template>
        </el-menu>



    </div>
</template>

<script setup lang="ts">
import { title } from 'process';

defineProps([
    'menuList',
])
</script>

<style scoped lang="scss">
.menu {
    padding: 40px 0;
    width: 100%;
    height: 100%;

    overflow: auto;

}
</style>