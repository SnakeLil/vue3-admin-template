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
                                <el-button type="info" plain icon="Edit" @click="handelModifyClick">修改</el-button>
                                <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消"
                                    :icon="InfoFilled" icon-color="#626AEF" :title="`确定删除${row.attrName}吗?`">
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
                        <el-input placeholder="请输入属性名"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="info" icon="Plus">添加属性</el-button>
                <el-button type="info" @click="scene = !scene" plain>取消</el-button>
                <el-table border style="margin: 20px 0;">
                    <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                    <el-table-column label="属性值" align="center"></el-table-column>
                    <el-table-column label="操作" align="center"></el-table-column>
                </el-table>
                <el-button type="info">保存</el-button>
                <el-button type="info" @click="scene = !scene" plain>取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import { watch, ref, reactive } from 'vue'
// 分类仓库
import useCategoryStore from '@/store/modules/category'
// 属性接口
import { getAttrInfoList } from '@/api/product/attr/index.ts'
import type { AttrResData, AttrList ,Attr} from '@/api/product/attr/type.ts'
import { ElLoading, ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
let attrArr = ref<AttrList>([])
// 定义卡片内容切换
let scene = ref<boolean>(true)
// 收集新增的属性的数据
let addAttr = reactive<Attr>({
    attrName: '',//新增的属性名
    attrValueList:[//新增的属性的属性值数组
    ],
    categoryId:'',//三级分类的id
    categoryLevel:3,//三级分类
})
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
        console.log(res)
        loadingInstance.close()
        if (res.code === 200) {
            attrArr.value = res.data
        }
    } catch (err) {
        console.log(err)
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
    scene.value = !scene
}
const handelModifyClick = () => {
    scene.value = !scene
}

</script>

<style scoped></style>