<template>
    <el-card>
        <el-form :inline="true" style="margin:18px 0 0">
            <el-form-item label="一级分类" size="large">
                <el-select :disabled="!scene" placeholder="请选择" v-model="categoryStore.c1Id" @change="handleC1Change(categoryStore.c1Id)">
                    <el-option v-for="item in categoryStore.c1Arr" :label="item.name" :key="item.id" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" size="large">
                <el-select :disabled="!scene" placeholder="请选择" v-model="categoryStore.c2Id"  @change="handleC2Change(categoryStore.c2Id)">
                    <el-option v-for="item in categoryStore.c2Arr" :label="item.name" :key="item.id" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" size="large">
                <el-select :disabled="!scene" placeholder="请选择" v-model="categoryStore.c3Id">
                    <el-option v-for="item in categoryStore.c3Arr" :label="item.name" :key="item.id" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted,onBeforeUnmount } from 'vue'
import  useCategoryStore  from '@/store/modules/category.ts';
defineProps(['scene'])
let categoryStore = useCategoryStore()


onMounted(() => {
    getC1()
})
const getC1 = () => {
    categoryStore.getC1()
}
const handleC1Change = (c1Id: number) =>{
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    categoryStore.c3Arr=[]
    categoryStore.c1Change(c1Id)
}
const handleC2Change = (c2Id: number) =>{
    categoryStore.c2Change(c2Id)
    categoryStore.c3Id = ''
}
onBeforeUnmount(()=>{
    categoryStore.$reset()
})

</script>

<style scoped></style>