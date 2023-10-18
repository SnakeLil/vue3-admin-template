<template>
    <el-menu default-active="2" class="el-menu-vertical-demo">
        <template v-for="(item) in menuList" :key="item.path">
            <!-- 没有子节点 -->
            <template v-if="!item.children">
                <el-menu-item :index="item.path" v-if="!item.meta?.hidden" @click="goRoute">
                    <template #title>
                        <el-icon>
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span>{{ item.meta?.title }}</span>
                    </template>
                </el-menu-item>
            </template>
            <!-- 一个子节点，按没有子节点显示 -->
            <template v-if="item.children && item.children.length === 1">
                <el-menu-item :index="item.children[0].path" v-if="!item.children[0]?.meta?.hidden" @click="goRoute">
                    <template #title>
                        <el-icon>
                            <component :is="item.children[0].meta.icon"></component>
                        </el-icon>
                        <span>{{ item?.children[0].meta?.title }}</span>
                    </template>
                </el-menu-item>
            </template>
            <!-- 多个子节点，展示折叠  -->

            <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">

                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta?.title }}</span>
                </template>
                <Menu :menuList="item.children" />
                <!-- <el-menu-item  v-for="row in item.children" index="row.path">{{ row.meta?.title }}</el-menu-item> -->


                <!-- <el-menu-item-group title="Group Two">
                        <el-menu-item index="1-3">item three</el-menu-item>
                    </el-menu-item-group> -->
            </el-sub-menu>
        </template>
    </el-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
let $router = useRouter()
defineProps([
    'menuList',
])
const goRoute = (vc: any) => {
    // el-menu-item有点击事件，回调函数的参数，会注入这个item的实例
    $router.push(vc.index)
    console.log(vc.index)
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped lang="scss"></style>