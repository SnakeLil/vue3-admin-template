<template>
    <div>
        <el-form label-width="auto" label-position="top" size="default">

            <el-form-item label="SKU名称">
                <el-input style="width: 200px" clearable v-model="skuParams.skuName" />
            </el-form-item>
            <el-form-item label="价格（元）">
                <el-input style="width: 200px" type="number" clearable placeholder="价格（元）" v-model="skuParams.price" />
            </el-form-item>
            <el-form-item label="重量（kg）">
                <el-input style="width: 200px" type="number" clearable placeholder="重量（kg）" v-model="skuParams.weight" />
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input type="textarea" :autosize="{ minRows: 4 }" clearable placeholder="sku描述"
                    v-model="skuParams.skuDesc" />
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form label-width="132px" inline size="default" style="margin-top: 10px;" label-position="right">
                    <el-form-item :label="item.attrName + ' :'" v-for="item in attrList" :key="item.id" style="margin:10px">
                        <el-select style="width: 200px" v-model="item.attrIdAndName">
                            <el-option :label="valueItem.valueName" :value="`${item.id}:${valueItem.id}`"
                                v-for="valueItem in item.attrValueList" :key="valueItem.id" />
                        </el-select>
                    </el-form-item>

                </el-form>
            </el-form-item>
            <el-form-item label="销售属性" v-show="saleAttrList.length === 0 ? false : true">
                <el-form abel-width="auto" inline size="default" style="margin-top: 10px;">
                    <el-form-item :label="item.saleAttrName" v-for="item in saleAttrList" :key="item.id">
                        <el-select v-model="item.attrIdAndName" style="width: 200px"
                            :placeholder="`请选择${item.saleAttrName}`">
                            <el-option :label="valueItem.saleAttrValueName" :value="`${item.id}:${valueItem.id}`"
                                v-for="valueItem in item.spuSaleAttrValueList" :key="valueItem.id" />
                        </el-select>
                    </el-form-item>

                </el-form>
            </el-form-item>
            <el-form-item label="图片">
                <el-table border :data="spuImageList" ref="picTable" stripe>
                    <el-table-column type="selection" width="100" align="center"></el-table-column>
                    <el-table-column label="图片" align="center">
                        <template #="{ row }">
                            <div style="display: flex;width: 100%;height: 100%; padding: 0 40px;justify-content: center;">
                                <img :src="row.imgUrl" alt="" style="width:50px;height: 50px;">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="图片名称" align="center" prop="imgName" />
                    <el-table-column label="操作" align="center">
                        <template #="{ row }">
                            <div style="width: 100%;height: 100%;display: flex; gap: 40px;justify-content: center;">
                                <el-button type="info" plain size="mini" icon="Pointer"
                                    @click="handleDefalut(row)">设为默认图</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="info" icon="EditPen" @click="save">保存</el-button>
                <el-button type="info" plain icon="SwitchButton" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getAttrInfoList } from '@/api/product/attr/index'
import { getSpuImageList, getSpuSaleList, addSkuForSpu } from '@/api/product/spu/index'
import { SpuSaleAttrResData, SpuImageResData, SkuData, SkuAttrValue, SkuSaleValue } from '@/api/product/spu/type'
import { AttrResData } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeToList'])
//收集sku参数
let skuParams = reactive<SkuData>({
    //定义存储sku名称
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',//sku名
    price: 0,
    weight: 0,
    skuDesc: '',
    skuAttrValueList: [
        //     {attrId: '',//平台属性id
        //     valueId: '',//属性值id
        // }
    ],//平台属性SkuAttrValue
    skuSaleAttrValueList: [
        //     {saleAttrId:'',//属性id
        // saleAttrValueId: '',//属性值id
        // }
    ],//SkuSaleValue
    skuDefaultImg: '',//图片地址
})


//定义收集平台属性列表
let attrList = ref<any[]>([])
// 定义收集图片列表
let spuImageList = ref<any[]>([])
// 图片表格实例
let picTable = ref<any>()
// 定义收集销售属性列表
let saleAttrList = ref<any[]>([])
const cancel = () => {
    $emit('changeToList')
}
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    skuParams.category3Id = spu.category3Id
    skuParams.spuId = spu.id
    skuParams.tmId = spu.tmId
    try {
        // 平台属性
        let attrListRes: AttrResData = await getAttrInfoList(c1Id, c2Id, spu.category3Id)
        attrList.value = attrListRes.data
        // 获取所属spu的所有图片列表
        let imgListRes: SpuImageResData = await getSpuImageList(spu.id)
        spuImageList.value = imgListRes.data
        // 获取关联的spu的销售属性列表
        let saleAttrRes: SpuSaleAttrResData = await getSpuSaleList(spu.id)
        saleAttrList.value = saleAttrRes.data
    } catch (err) {
        ElMessage({
            message: err.message,
            type: 'error',
            center: true,
            showClose: true,
        })
    }

    // getSpuImageList(spu.id)
}
const handleDefalut = (img: any) => {
    picTable.value.clearSelection()
    picTable.value.toggleRowSelection(img, true)
    skuParams.skuDefaultImg = img.imgUrl
}
// 点击保存
const save = async () => {
    // 整理参数
    let attrArr = attrList.value.map(item => {
        if (item.attrIdAndName?.length > 0) {
            return {
                attrId: item.attrIdAndName.split(':')[0],
                valueId: item.attrIdAndName.split(':')[1],
            }
        }else {
            return
        }
    }).filter(item=>{
        return item
    })
    let saleArr = saleAttrList.value.map(item => {
        if(item.attrIdAndName?.length > 0) {
            return {
            saleAttrId: item.attrIdAndName.split(':')[0],
            saleAttrValueId: item.attrIdAndName.split(':')[1],
        }
        }else {
            return
        }

    }).filter(item=>{
        return item
    })
    skuParams.skuAttrValueList = attrArr
    skuParams.skuSaleAttrValueList = saleArr
    skuParams.skuImageList = []
    console.log(skuParams)
    try {
        let res = await addSkuForSpu(skuParams)
        if(res.code === 200) {
            ElMessage({
                type: 'success',
                center: true,
                showClose: true,
                message: '添加成功'
            })
            // 添加成功，切换回列表页
            //（这里可能接口有问题，返回201，一直是失败）
            $emit('changeToList')
        }else {
            console.log(res)
            ElMessage({
                type: 'warning',
                center: true,
                showClose: true,
                message: res.message
            })
        }
    }catch(err) {
        ElMessage({
            type: 'error',
            center: true,
            showClose: true,
            message: err.message
        })
    }
    
}
defineExpose({
    initSkuData
})
</script>

<style scoped></style>