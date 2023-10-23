<template>
    <div>
        <el-form ref="form" label-width="auto" label-position="top" size="default">
            <el-form-item label="SPU名称">
                <el-input style="width: 200px" clearable v-model="spuData.spuName" />
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select placeholder="请选择相应品牌名" v-model="spuData.tmId">
                    <el-option :label="item.tmName" :value="item.id" v-for="(item, index) in trademarkList"
                        :key="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" :autosize="{ minRows: 3 }" placeholder="请输入SPU描述" v-model="spuData.description" />
            </el-form-item>
            <el-form-item label="SPU图片">
                <!-- 文件上传 -->
                <el-upload v-model:file-list="spuImageList" action="/api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeAvatarUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 700px;height: 500px;" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select :placeholder="`还有${allSaleAttrList?.length - spuSaleList?.length}种销售属性未选择`"
                    v-model="allSaleAttrValue">
                    <el-option :label="item.name" :value="item.id" v-for="item in allSaleAttrList" />
                </el-select>
                <el-button type="info" icon="Plus" style="margin-left: 15px;">添加属性值</el-button>
                <el-table border style="margin-top: 20px;" :data="spuSaleList">
                    <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                    <el-table-column prop="prop" label="属性名" width="200" align="center">
                        <template #="{ row }">
                            <div>
                                {{ row.saleAttrName }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="属性值" width="width" align="center">
                        <template #="{ row }">
                            <el-tag style="margin: 0 5px;" v-for="item in row.spuSaleAttrValueList">{{
                                item.saleAttrValueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width" align="center">
                        <template #="{ row }">
                            <div style="width: 100%;height: 100%;display: flex;justify-content: center;gap: 30px;">
                                <el-button icon="Edit">编辑</el-button>
                                <el-button type="info" icon="Delete">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="info">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TrademarkResData, SpuImageResData, SpuSaleAttrResData, AllSaleAttrResData } from '@/api/product/spu/type'
import { getAllTrademarkList, getSpuImageList, getSpuSaleList, getAllSaleAttrList, } from '@/api/product/spu/index'
import type { spuData as spuType, Trademark, SpuImage, SpuSaleAttr, SaleAttrValue } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeToList'])
let spuData = ref<spuType>({
    spuName: '', //spu名
    tmId: '',//品牌id
    description: '', //描述
    category3Id: '',//分类id
    spuImageList: [],//图片列表
    spuSaleAttrList: [],//销售属性列表
})
// 品牌信息列表
let trademarkList = ref<Trademark[]>([])

// 图片列表
let spuImageList = ref<SpuImage[]>([])

// 销售属性列表
let spuSaleList = ref<SpuSaleAttr[]>([])

// 所有销售属性列表
let allSaleAttrList = ref<SaleAttrValue[]>([])
let allSaleAttrValue = ref<number | string>('')
// 通过判断销售属性列表中的baseSaleAttrId是否和所有销售属性列表中的id相同，相同则过滤

// 控制照片dialog的显示与隐藏
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')
const cancel = () => {
    $emit('changeToList')
}
const getSpuData = async (spu: spuType) => {
    // spu为父组件传递的row，父组件通过ref获取子组件实例，调用这个函数
    spuData.value = spu

    try {
        // 获取全部品牌数据
        let trademarkRes: TrademarkResData = await getAllTrademarkList()
        trademarkList.value = trademarkRes.data

        // 根据id获取某spu的图片数据
        let spuImageRes: SpuImageResData = await getSpuImageList(spu.id as number)
        spuImageList.value = spuImageRes.data.map(item => {
            return {
                name: item.imgName,
                url: item.imgUrl
            }
        })
        console.log(spuImageRes.data)

        // 根据id获取某spu的销售属性数据
        let spuSaleRes: SpuSaleAttrResData = await getSpuSaleList(spu.id as number)
        spuSaleList.value = spuSaleRes.data
        // console.log(spuSaleRes.data)

        // 获取所有销售属性数据
        let allSaleAttrRes: AllSaleAttrResData = await getAllSaleAttrList()
        allSaleAttrList.value = allSaleAttrRes.data
        // console.log(allSaleAttrRes.data)

    } catch (error) {

        ElMessage({
            showClose: true,
            message: '请求失败',
            center: true,
            type: 'error'
        })
    }

}
// 照片点击预览
const handlePictureCardPreview = (uploadFile: any) => {
    console.log(uploadFile)
    dialogImageUrl = uploadFile.url
    dialogVisible.value = true
}
const handleRemove = (file: any) => {

}
const beforeAvatarUpload = (file: any) => {
    if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/webg ' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 < 4) {

            return true
        } else {
            ElMessage({
                showClose: true,
                message: '文件大小超过4M',
                center: true,
                type: 'warning'
            })
            return false
        }

    } else {
        ElMessage({
            showClose: true,
            message: '上传文件的类型只能是jpg/jpeg/png/webg/gif',
            center: true,
            type: 'warning'
        })
        return false
    }

}
defineExpose({
    getSpuData
})
</script>

<style scoped></style>