<template>
    <div>
        <el-form ref="form" label-width="auto" label-position="top" size="default">
            <el-form-item label="SPU名称">
                <el-input style="width: 200px" />
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select placeholder="请选择相应品牌名">
                    <el-option label="Zone one" value="shanghai" />
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" :autosize="{ minRows: 3 }" placeholder="请输入SPU描述" />
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload v-model:file-list="fileList"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select placeholder="请选择相应销售属性">
                    <el-option label="Zone one" value="shanghai" />
                </el-select>
                <el-button type="info" icon="Plus" style="margin-left: 15px;">添加属性值</el-button>
                <el-table border style="margin-top: 20px;" :data="[1,1]">
                    <el-table-column type="index" label="序号" width="100" align="center"/>
                    <el-table-column prop="prop" label="属性名" width="200" align="center"/>
                    <el-table-column prop="prop" label="属性值" width="width" align="center"/>
                    <el-table-column prop="prop" label="操作" width="width" align="center">
                        <template #="{row}">
                        <div style="width: 100%;height: 100%;display: flex;justify-content: center;gap: 30px;">
                            <el-button  icon="Edit" >编辑</el-button>
                            <el-button type="info" icon="Delete" >删除</el-button>
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
let $emit = defineEmits(['changeToList'])
const cancel = ()=>{
    $emit('changeToList')
}
</script>

<style scoped></style>