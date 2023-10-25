<template>
    <!-- sku管理模块 -->
    <div>
        <el-card>
            <el-table border :data="skuListData" stripe>
                <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                <el-table-column label="商品名称" prop="skuName" show-overflow-tooltip width="200px"
                    align="center"></el-table-column>
                <el-table-column label="商品描述" show-overflow-tooltip width="300" align="center"
                    prop="skuDesc"></el-table-column>
                <el-table-column label="默认图片" align="center" width="300">
                    <template #="{ row }">
                        <div style="width: 100%;height: 100%;display: flex;justify-content: center;padding:0 40px;">
                            <img :src="row.skuDefaultImg" alt="" style="width: 70px;height: 70px;">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品价格" prop="price" width="200" align="center"></el-table-column>
                <el-table-column label="商品重量" prop="weight" width="200" align="center"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="200" align="center"></el-table-column>
                <el-table-column label="操作" fixed="right" align="center" width="400">
                    <template #="{ row }">
                        <div style="width: 100%;height: 100%;display: flex;justify-content: center;">
                            <el-button :type="row.isSale ? 'info' : 'primary'"
                                @click="row.isSale ? handleOffSale(row) : handleOnSale(row)"
                                :icon="row.isSale ? 'Bottom' : 'Top'" text bg>{{ row.isSale ? '下架' : '上架' }}</el-button>
                            <el-button @click="handleEdit" icon="Edit">编辑</el-button>
                            <el-button type="Primary" @click="openDrawer(row)" icon="ZoomIn">查看</el-button>
                            <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                                icon-color="#626AEF" :title="`确定删除吗?`" @confirm="confirmDelete(row)">
                                <template #reference>
                                    <el-button type="info" icon="delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 20px;" v-model:current-page="currentPage" v-model:page-size="pageLimit"
                :page-sizes="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100]" :small="false"
                :background="false" layout="  jumper, prev, pager, next,->,total, sizes" :total="total"
                @size-change="getSkuListData" @current-change="getSkuListData" />
            <!-- 抽屉组件 -->
            <el-drawer @close="handelDrawerClose" v-model="drawer" title="SKU详情" direction="rtl" size="50%"
                close-on-press-escape show-close>
                <el-card shadow="hover">

                    <!-- 信息展示 -->
                    <el-descriptions class="margin-top" :title="skuInfoData.skuName" :column="1" border>

                        <!-- 名称 -->
                        <el-descriptions-item>
                            <!-- 名称 -->
                            <template #label>
                                <div class="cell-item">

                                    商品名称
                                </div>
                            </template>
                            <span>{{ skuInfoData.skuName }}</span>
                        </el-descriptions-item>
                        <!-- 描述 -->
                        <el-descriptions-item>
                            <!-- 描述 -->
                            <template #label>
                                <div class="cell-item">
                                    商品描述
                                </div>
                            </template>
                            <span>{{ skuInfoData.skuDesc }}</span>
                        </el-descriptions-item>
                        <!-- 价格 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">

                                    商品价格
                                </div>
                            </template>
                            <span>{{ skuInfoData.price }}元</span>
                        </el-descriptions-item>
                        <!-- 重量 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <span>商品重量</span>
                                </div>
                            </template>
                            <span>{{ skuInfoData.weight }}kg</span>
                        </el-descriptions-item>
                        <!-- 创建时间 -->
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <span>创建时间</span>
                                </div>
                            </template>
                            <span>{{ skuInfoData.createTime }}</span>
                        </el-descriptions-item>

                        <!-- 平台属性 -->
                        <el-descriptions-item >
                            <template #label>
                                <div class="cell-item">
                                    <span>平台属性</span>
                                </div>
                            </template>
                            <el-tag v-for="item in skuInfoData.skuAttrValueList" :key="item.id" style="margin: 5px;">
                                {{ item.attrName }}:{{ item.valueName }}
                            </el-tag>
                        </el-descriptions-item>

                        <!-- 销售属性 -->
                        <el-descriptions-item >
                            <template #label>
                                <div class="cell-item">
                                    <span>销售属性</span>
                                </div>
                            </template>
                            <el-tag v-for="item in skuInfoData.skuSaleAttrValueList" :key="item.id" style="margin: 5px;">
                                {{ item.saleAttrName }}:{{ item.saleAttrValueName }}
                            </el-tag>
                        </el-descriptions-item>

                        <!-- 图片 -->

                    </el-descriptions>
                    <!-- 轮播 -->
                    <el-carousel :interval="5000" arrow="always" style="margin-top: 40px;">
                        <el-carousel-item v-for="item in skuInfoData.skuImageList" :key="item.id">
                            <div style="width: 100%;height: 100%;display: flex;justify-content: center;">

                                <img :src="item.imgUrl" alt="" style="width: 50%;height: 100%;">
                            </div>
                        </el-carousel-item>
                    </el-carousel>


                </el-card>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSkuList, onSale, offSale, getSkuInfo ,delSku} from '@/api/product/sku/index.ts'
import { skuListResData } from '@/api/product/sku/type.ts'
import { ElMessage } from 'element-plus';
import { SkuData } from '@/api/product/spu/type'
import { InfoFilled } from '@element-plus/icons-vue'
let currentPage = ref<number>(1)
let pageLimit = ref<number>(15)
let total = ref<number>(20)
let skuListData = ref<SkuData[]>([])
let drawer = ref<boolean>(false)

// sku
let skuInfoData = ref<any>({

})
onMounted(() => {
    getSkuListData()
})
const getSkuListData = async () => {

    try {
        let res: skuListResData = await getSkuList(currentPage.value, pageLimit.value)
        if (res.code == 200) {
            currentPage.value = res.data.current
            pageLimit.value = res.data.size
            total.value = res.data.total
            skuListData.value = res.data.records
        } else {
            ElMessage({
                message: res.message,
                type: 'warning',
                center: true,
                showClose: true
            })
        }
    } catch (err: any) {
        ElMessage({
            message: err.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }

}

// isSale 为1，说明商品是上架状态，点击按钮，发送商品下架请求
const handleOffSale = async (row: SkuData) => {
    try {
        let res: any = await offSale(row.id as number)
        if (res.code == 200) {
            ElMessage({
                message: '下架成功',
                type: 'success',
                center: true,
                showClose: true
            })
            getSkuListData()
        } else {
            ElMessage({
                message: res.message,
                type: 'warning',
                center: true,
                showClose: true
            })
        }
    } catch (err: any) {
        console.log(err)
        ElMessage({
            message: err.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }
}
// 商品上架，isSale为0，说明商品是下架状态，点击按钮，发送商品上架请求
const handleOnSale = async (row: SkuData) => {
    try {
        let res: any = await onSale(row.id as number)
        if (res.code == 200) {
            ElMessage({
                message: '上架成功',
                type: 'success',
                center: true,
                showClose: true
            })
            getSkuListData()
        } else {
            ElMessage({
                message: res,
                type: 'warning',
                center: true,
                showClose: true
            })
        }
    } catch (err: any) {
        console.log(err)
        ElMessage({
            message: err.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }
}
// 点击编辑按钮，（此功能后端接口还未实现）
const handleEdit = () => {
    ElMessage({
        message: '此功能还未开发~0.0~,不要点我噢o.o',
        type: 'warning',
        center: true,
        showClose: true
    })
}
// 点击查看，打开抽屉
const openDrawer = async (row: SkuData) => {
    try {
        let res = await getSkuInfo(row.id as number)
        if (res.code == 200) {
            skuInfoData.value = res.data

        } else {
            ElMessage({
                message: res.message,
                type: 'warning',
                center: true,
                showClose: true
            })
        }
    } catch (err: any) {
        ElMessage({
            message: err.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }

    drawer.value = true
}
// 抽屉关闭回调
const handelDrawerClose = () => {

}
// 点击确认删除
const confirmDelete = async (row:SkuData)=>{
    try {
        let res = await delSku(row.id as number)
        if(res.code == 200) {
            console.log(res)
            ElMessage({
                message: '删除成功',
                type: 'success',
                center: true,
                showClose: true
            })
            getSkuListData()
        }else {
            ElMessage({
                message: res.message,
                type: 'warning',
                center: true,
                showClose: true
            })
        }
    }catch(err:any){
        ElMessage({
            message: err.message,
            type: 'error',
            center: true,
            showClose: true
        })
    } 
}
</script>

<style scoped></style>