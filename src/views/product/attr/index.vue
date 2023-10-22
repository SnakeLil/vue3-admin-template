<template>
    <div id="category">
        <!-- 三级分类组件 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 20px 0;">
            <div v-show="scene">
                <el-button type="info" icon="Plus" :disabled="categoryStore.c3Id ? false : true" style="margin: 10px 0;"
                    @click="handleClick">添加属性</el-button>

                <el-table border :data="attrArr">
                    <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                    <el-table-column label="属性名" prop=attrName width="200" align="center"></el-table-column>
                    <el-table-column label="属性值名" align="center">
                        <template #="{ row }">
                            <el-tag v-for="item in row.attrValueList" :key='item.id' style="margin: 5px;">
                                {{ item.valueName }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template #="{ row, $index }">
                            <div style="width: 100%;height: 100%;display: flex;justify-content: center;">
                                <el-button type="info" plain icon="Edit" @click="handelModifyClick(row)">修改</el-button>
                                <el-popconfirm @confirm='confirmDelete(row.id)' width="220" confirm-button-text="确认"
                                    cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF"
                                    :title="`确定删除${row.attrName}吗?`">
                                    <template #reference>
                                        <el-button type="info" icon="delete">删除</el-button>
                                    </template>
                                </el-popconfirm>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="!scene">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名" v-model="AttrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="addAttrValue" :disabled="AttrParams.attrName.trim().length ? false : true" type="info"
                    icon="Plus">添加属性</el-button>
                <el-button type="info" @click="cancel" plain>取消</el-button>
                <el-table border style="margin: 20px 0;" :data="AttrParams.attrValueList">
                    <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                    <el-table-column label="属性值" align="center">
                        <template #="{ row, $index }">
                            <div style="width: 100%;height: 100%; display: flex; justify-content: center;padding: 0 40px;">
                                <el-input :ref="(vc: any) => inputArr[$index] = vc" v-model="row.valueName" clearable
                                    @blur="handleBlur(row, $index)" v-if="row.isBlur" placeholder="请输入该属性的一个属性值"
                                    :prefix-icon="DocumentAdd"></el-input>
                                <span v-if="!row.isBlur">{{ row.valueName }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #="{ row, $index }">
                            <div style="width: 100%;height: 100%;display: flex;justify-content: center;gap: 30px;">
                                <el-button type="info" plain icon="Edit" @click="editClick(row, $index)">编辑</el-button>
                                <el-button type="info" icon="Delete"
                                    @click="AttrParams.attrValueList.splice($index, 1)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="info" @click="save"
                    :disabled="AttrParams.attrValueList.length != 0 && AttrParams.attrValueList[0].valueName != '' ? false : true">保存</el-button>
                <el-button type="info" @click="cancel" plain>取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { DocumentAdd } from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { watch, ref, reactive, nextTick ,onBeforeUnmount} from 'vue'
// 分类仓库
import useCategoryStore from '@/store/modules/category'
// 属性接口
import { getAttrInfoList, addOrUpdateAttr, deleteAttr } from '@/api/product/attr/index.ts'
import type { AttrResData, AttrList, Attr, attrValue } from '@/api/product/attr/type.ts'
import { ElLoading, ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
let attrArr = ref<AttrList>([])
// 定义卡片内容切换
let scene = ref<boolean>(true)
// 收集新增的属性的数据
let AttrParams = reactive<Attr>({
    attrName: '',//新增的属性名
    attrValueList: [//新增的属性的属性值数组
    ],
    categoryId: '',//三级分类的id
    categoryLevel: 3,//三级分类
})
// 获取input实例
const inputArr = ref<any>([])
watch(() => categoryStore.c3Id, () => {
    // 清空

    // 需要判断是否有三级分类
    if (!categoryStore.c3Id) {
        attrArr.value = []
        return
    }
    getAttr()
})
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    const loadingInstance = ElLoading.service({ target: '#category', text: 'loading' })
    try {
        let res: AttrResData = await getAttrInfoList(c1Id, c2Id, c3Id)
        loadingInstance.close()
        if (res.code === 200) {
            attrArr.value = res.data
        }
    } catch (err) {

        loadingInstance.close()
        ElMessage({
            showClose: true,
            message: '请求超时',
            center: true,
        })
    }

}
// 点击切换到添加属性
const handleClick = () => {
    scene.value = !scene.value
    // 清空添加属性的相关信息
    if (AttrParams.id) {
        delete AttrParams.id
    }
    Object.assign(AttrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3,
    })
    AttrParams.categoryId = categoryStore.c3Id

}
// 三级分类下，点击修改属性按钮，将已有的属性值带到修改页（赋值给AttrParams）
const handelModifyClick = (row: Attr) => {
    scene.value = !scene.value

    //  Object.assign()对象合并,注意，需要深拷贝
    Object.assign(AttrParams, JSON.parse(JSON.stringify(row)))
}

// 点击添加属性
const addAttrValue = () => {
    AttrParams.attrValueList.push({
        valueName: '',
        isBlur: true
    })
    nextTick(() => {
        inputArr.value[AttrParams.attrValueList.length - 1].focus()
    })

}
// 点击保存按钮
const save = async () => {
    let empty = AttrParams.attrValueList.filter((item) => {
        return item.valueName === ''
    })
    console.log(empty)
    if (empty.length > 0) {
        ElMessage({
            showClose: true,
            message: '存在空属性值，请检查',
            center: true,
            type: 'warning',
        })
        return
    }
    const loadingInstance = ElLoading.service({ target: '#category', text: 'loading' })
    try {
        let res = await addOrUpdateAttr(AttrParams)
        if (res.code === 200) {
            loadingInstance.close()
            scene.value = !scene.value///切换场景
            ElMessage({
                showClose: true,
                message: AttrParams.id ? '修改成功' : '添加成功',
                center: true,
                type: 'success',
            })
            console.log(res)

            getAttr()
        } else {
            ElMessage({
                showClose: true,
                message: '失败,请稍后重试',
                center: true,
            })
        }



    } catch (err) {
        ElMessage({
            showClose: true,
            message: '添加失败',
            center: true,
            type: 'warning',
        })
    }


}
// 点击取消按钮
const cancel = () => {
    scene.value = !scene.value
    // getAttr()
}
const handleBlur = (row: attrValue, $index: number) => {

    //    空值
    if (row.valueName.trim().length === 0) {
        AttrParams.attrValueList.splice($index, 1)
        ElMessage({
            showClose: true,
            message: '属性值不能为空',
            center: true,
            type: 'warning',
        })

        return
    }
    // 重复值
    let repeat = AttrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName === row.valueName
        }
    })
    if (repeat) {
        inputArr.value[$index].focus()
        ElMessage({
            showClose: true,
            message: '已有相同的属性值',
            center: true,
            type: 'warning',
        })
        return
    }
    row.isBlur = false
}
// 点击编辑
const editClick = (row: attrValue, $index: number) => {
    row.isBlur = true
    nextTick(() => {
        inputArr.value[$index].focus()
    })

}
// 点击确认删除属性按钮
const confirmDelete = async (id: number) => {
    const loadingInstance = ElLoading.service({ target: '#category', text: 'loading' })
    try {
        let res: any = await deleteAttr(id)
        if (res.code === 200) {
            loadingInstance.close()
            ElMessage({
                showClose: true,
                message: '删除成功',
                center: true,
                type: 'success'
            })
            getAttr()
        }else {
            ElMessage({
            showClose: true,
            message: '请求超时',
            center: true,
        })
        }
    } catch (err) {
        ElMessage({
            showClose: true,
            message: '删除失败',
            center: true,
            type: 'warning'
        })
    }

}
onBeforeUnmount(()=>{
    categoryStore.$reset()
})
</script>

<style scoped></style>