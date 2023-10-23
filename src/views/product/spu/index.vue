<template>
    <div id="spu">
        <Category :scene="scene"></Category>

        <el-card style="margin: 20px 0;">
            <div v-show="compFlag === 0">
                <!-- 显示spu列表 -->
                <el-button type="info" icon="Plus" style="margin: 10px 0;"
                    :disabled="categoryStore.c3Id ? false : true" @click="handleAddSpu">添加SPU</el-button>
                <el-table border style="margin-bottom: 15px;" :data="spuList">
                    <el-table-column label="序号" type="index" width="150" align="center"></el-table-column>
                    <el-table-column label="SPU名称" align="center">
                        <template #="{ row }">
                            <div>
                                {{ row.spuName }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="SPU描述" align="center" show-overflow-tooltip>
                        <template #="{ row }">
                            <div>
                                {{ row.description }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #="{ row }">
                            <div style="width: 100%;height: 100%;display: flex;">
                            </div>
                            <el-button type="success" icon="Plus" size="mini" title="添加SKU" @click="handleAddSku"></el-button>
                            <el-button type="info" plain icon="Edit" size="mini" title="修改此SPU" @click="updateSpu(row)"></el-button>
                            <el-button icon="View" size="mini" title="查看所有sku"></el-button>
                            <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                                icon-color="#626AEF" :title="`确定删除吗?`" @confirm="">
                                <template #reference>
                                    <el-button type="info" icon="delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageLimit"
                    :page-sizes="[5, 7, 9, 10, 12, 15, 30]" :small="false" :background="false"
                    layout="  jumper, prev, pager, next,->,total, sizes" :total="total"
                    :disabled="categoryStore.c3Id ? false : true" @size-change="getSpuData" @current-change="getSpuData" />
            </div>
            <!-- 添加/修改spu的组件 -->
            <spu-form v-show="compFlag === 1" @changeToList="changeToList()" ref="spu"></spu-form>
            <!-- 添加sku的组件 -->
            <sku-form v-show="compFlag === 2"></sku-form>
        </el-card>


    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// 分类仓库
import useCategoryStore from '@/store/modules/category'
import { getSpuList } from '@/api/product/spu/index'
import type { SpuResData, spuData } from '@/api/product/spu/type'
import { ElLoading, ElMessage } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'
let compFlag = ref<number>(0) //控制组件切换0：列表，1：添加/修改spu，2：添加sku
let scene = ref<boolean>(true)
let currentPage = ref<number>(1)
let pageLimit = ref<number>(5)
let spuList = ref<spuData[]>()
let total = ref<number>()
let categoryStore = useCategoryStore()
// 获取子组件vc实例
let spu = ref<any>()
watch(() => categoryStore.c3Id, () => {
    if (categoryStore.c3Id) {
        getSpuData()
    } else {
        return
    }

})
// 获取spu列表
const getSpuData = async () => {
    const loadingInstance = ElLoading.service({ target: '#spu', text: 'loading' })
    let res: SpuResData = await getSpuList(currentPage.value, pageLimit.value, categoryStore.c3Id)
    if (res.code === 200) {
        console.log(res)
        spuList.value = res.data.records
        total.value = res.data.total
        loadingInstance.close()
    } else {
        loadingInstance.close()
        ElMessage({
            showClose: true,
            message: '请求超时',
            center: true,
        })
    }
}
// 点击添加spu
const handleAddSpu =()=>{
    compFlag.value = 1
    scene.value = false
}
// 点击修改已有的spu
const updateSpu = (row:spuData)=>{
    compFlag.value = 1
    scene.value = false
    // 获取到子组件的vc实例，调用子组件的getSpuData方法，将row传给子组件，子组件通过row获取到spu数据
    spu.value.getSpuData(row)
}
// 点击添加sku
const handleAddSku = ()=>{
    compFlag.value = 2
    scene.value = false
}
// 子组件，点击取消，切换到列表组件
const changeToList = ()=>{
    compFlag.value = 0
    scene.value = true
}
</script>

<style scoped></style>