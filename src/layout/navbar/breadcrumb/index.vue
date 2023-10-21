<template>
    <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="item.path"
        v-for="(item,index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
        
        >
        <el-icon style=" margin-right: 8px;vertical-align: center;">
            <component :is="item.meta.icon"   ></component>
        </el-icon>
        <span>{{ item.meta?.title }}</span>


    </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import {useRoute} from 'vue-router'
let $route = useRoute()

</script>

<style scoped lang="scss">

</style>