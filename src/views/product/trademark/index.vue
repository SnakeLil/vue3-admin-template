<template>
    <el-card class="box-card">
        <!-- 顶部按钮 -->
        <el-button plain icon="Plus" @click="addTrademark">添加品牌</el-button>
        <!-- 表格组件 -->
        <el-table border style="margin: 15px 0;" :data="trademarkArr">
            <el-table-column label="序号" type="index" align="center" width="100"></el-table-column>
            <el-table-column label="品牌名" align="center">
                <template #="{ row }">
                    <span>{{ row.tmName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="logo" align="center">
                <template #="{ row }">
                    <img :src="row.logoUrl" alt="" style="width: 50px;height: 50px;">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #="{ row }">
                    <div style="width: 100%;height: 100%;display: flex;justify-content: center;gap: 20px;">
                        <el-button type="info" plain icon="Edit" @click="updateTrademark(row)">修改</el-button>
                        <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消"
                            :icon="InfoFilled" icon-color="#626AEF" :title="`确定删除品牌：${row.tmName}吗?`" @confirm="deleteTrademark(row.id)">
                            <template #reference>
                            <el-button type="info" icon="delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器组件 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageLimit"
            :page-sizes="[5, 10, 20, 30, 40, 100]" :small="false" :background="false"
            layout="  jumper, prev, pager, next,->,total, sizes" :total="total" @size-change="getTrademarkList"
            @current-change="getTrademarkList" />
          
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog v-model="dialogVisible" :title="newTrademark.id ? '修改信息' : '添加品牌'">
        <el-form style="width: 70%;" :model="newTrademark" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" prop="tmName">
                <el-input placeholder="请输入品牌名称" v-model="newTrademark.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌logo" prop="logoUrl">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="newTrademark.logoUrl" :src="newTrademark.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button color="#ecf0f1" @click="cancel">取消</el-button>
            <el-button type="primary" color="#bdc3c7" @click="confirm">确认</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import { ref, onMounted, reactive, nextTick } from 'vue';
import { TrandemarkList, AddOrUpdateTrademark ,deleteTrandemark} from '@/api/product/trademark'
import { TrademarkList as TrademarkListType, Records, Trademark } from '@/api/product/trademark/type'
import { ElMessage, type UploadProps } from 'element-plus'

// 对话框显示/隐藏
const dialogVisible = ref(false)
// 当前页码
let currentPage = ref<number>(1);
// 每页展示数据的条数
let pageLimit = ref<number>(8);
// 存储品牌总数
let total = ref<number>(0);
// 存储品牌数组
let trademarkArr = ref<Records>([]);
// 定义收集新增品牌的数组
let newTrademark = reactive<Trademark>({
    tmName: '',
    logoUrl: ''
})
// fomr实例
let formRef = ref()
// trigger: 'blur'触发校验的时机，tmName触发时执行此函数
const validatorTmName = ( rules:any,value: any, callBack: any) => {
    if (!value) {
        callBack(new Error('请输入品牌名称'))
    } else {
        callBack()
    }

}
// logo校验触发的的函数
const validatorLogo = (rules:any, value: any, callBack: any) => {
    if (!value) {
        callBack(new Error('请上传品牌logo'))
        return
    } else {
        callBack()
    }

}
// 表单校验对象
const rules = {
    tmName: [
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [{ required: true, validator: validatorLogo }]
}
const getTrademarkList = async () => {
    let res: TrademarkListType = await TrandemarkList(currentPage.value, pageLimit.value)
    if (res.code == 200) {
        total.value = res.data.total
        trademarkArr.value = res.data.records
    }
}
onMounted(() => {
    getTrademarkList();
})
// 点击添加品牌
const addTrademark = () => {
    newTrademark.logoUrl = ''
    newTrademark.tmName = ''
    newTrademark.id = 0
    dialogVisible.value = true
    nextTick(() => {
        formRef.value?.clearValidate('logoUrl')
        formRef.value?.clearValidate('tmName')
    })

}
// 点击 修改品牌信息
const updateTrademark = (trademark: Trademark) => {
    dialogVisible.value = true
    Object.assign(newTrademark, trademark)
    nextTick(() => {
        formRef.value?.clearValidate('logoUrl')
        formRef.value?.clearValidate('tmName')
    })

}
// 点击删除品牌
const deleteTrademark = async(id:number) => {
   let res =  await deleteTrandemark(id)
   if(res.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getTrademarkList()
   }else {
    ElMessage({ type: 'error', message: '删除失败' })
   }

}
// 点击对话框取消按钮
const cancel = () => {
    dialogVisible.value = false
}
// 点击   对话框确认按钮 /确认修改/添加
const confirm = async () => {
    // 表单校验
    await formRef.value?.validate()
    // 校验表单
    const res = await AddOrUpdateTrademark(newTrademark)
    if (res.code == 200) {
        if (newTrademark.id) {
            ElMessage.success('修改成功')
        } else {
            ElMessage.success('添加成功')
        }

        getTrademarkList()
        dialogVisible.value = false

    } else {
        if (newTrademark.id) {
            ElMessage.error('修改失败')
        } else {
            ElMessage.error('添加失败')
        }
        dialogVisible.value = false
    }

}
// 图片上传：before upload
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg'
        && rawFile.type !== 'image/png'
        && rawFile.type !== 'image/gif'
        && rawFile.type !== 'image/jpg'
        && rawFile.type !== 'image/webp') {
        ElMessage.error('上传图片只能是 JPG/PNG/GIF/JPEG/WEBP 格式!')
        return false
    } else {
        if (rawFile.size / 1024 / 1024 > 4) {
            ElMessage.error('上传图片大小不能超过 4MB!')
            return false
        } else {
            return true
        }
    }
}
// 图片上传：sucess upload
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any) => {
    if (response.code == 200) {
        ElMessage.success('上传成功')
        newTrademark.logoUrl = response.data
        // 清楚图片校验
        formRef.value.clearValidate('logoUrl')
    } else {
        ElMessage.error('上传失败')
    }
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 150px;
    height: 150px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    text-align: center;
}
</style>