<template>
    <div id="permission">
        <el-table :data="permissionList" style="width: 100%; margin-bottom: 20px" row-key="id" border>
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="code" label="权限值" />
            <el-table-column prop="updateTime" label="修改时间" />
            <el-table-column prop="updateTime" label="操作" width="400px">
                <template #="{ row }">
                    <div style="width:100%;height:100%;display:flex;justify-content:center;">
                        <el-button @click="handleOpenMenu(row)" :type="row.level == 3 ? 'success' : 'info'" bg text
                            icon="Plus" :disabled="row.level == 4 ? true : false">
                            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
                        </el-button>
                        <el-button @click="handleUpdateMenu(row)" type="info" plain icon="Edit"
                            :disabled="row.level == 1 ? true : false">编辑</el-button>
                        <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                            icon-color="#626AEF" :title="`确定删除${row.name}吗?`" @confirm="deleteRole(row)">
                            <template #reference>
                                <el-button type="info" icon="delete"
                                    :disabled="row.level == 1 ? true : false">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加，编辑菜单对话框 -->
        <el-dialog v-model="dialogFormVisible"  width="550px">
            <template #header>
                <span>{{menuForm.id?"更新菜单":"添加菜单"}}</span>
            </template>
            <el-form label-position="top">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input style="width:250px" v-model="menuForm.name" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="权限值" :label-width="formLabelWidth">
                    <el-input style="width:250px" v-model="menuForm.code" placeholder="请输入权限值" />
                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="info" @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="info" plain @click="confirmAddOrUpdate">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { getMenuList, deletePermission, addOrUpdatePermission } from '@/api/acl/menu/index'
import { permission, permissionResData } from '@/api/acl/menu/type'
import { ElMessage, ElLoading } from 'element-plus';
// 定义收集所有权限
let permissionList = ref<permission[]>([])
// 对话框显示
let dialogFormVisible = ref<boolean>(false)
// 收集添加/编辑的菜单信息
let menuForm = ref<permission>({
    id: '',
    name: '',
    code: '',
    level: '',
    pid: ''
})
onMounted(() => {
    getAllPermission()
})
// 获取所有权限
const getAllPermission = async () => {
    const loadingInstance = ElLoading.service({ target: '#permission', text: 'Loading' })
    let res: permissionResData = await getMenuList()
    if (res.code == 200) {
        permissionList.value = res.data
        loadingInstance.close()
    } else {
        ElMessage({
            message: res.message,
            type: 'error',
            center: true,
            showClose: true
        })
        loadingInstance.close()
    }
}

// 点击确定框确认按钮删除某个权限
const deleteRole = async (row: permission) => {
    const loadingInstance = ElLoading.service({ target: '#permission', text: 'Loading' })
    let res = await deletePermission(row.id)
    if (res.code == 200) {
        ElMessage({
            message: '删除成功',
            type: 'success',
            center: true,
            showClose: true
        })
        loadingInstance.close()
        getAllPermission()
    } else {
        ElMessage({
            message: res.message,
            type: 'error',
            center: true,
            showClose: true
        })
        loadingInstance.close()
    }
}
// 点击添加菜单
const handleOpenMenu = (row: permission) => {
    Object.assign(menuForm.value, {id: '',name: '',code: '',level: '',pid: ''})
    dialogFormVisible.value = true
    menuForm.value.level = row.level + 1
    menuForm.value.pid = row.id
}
// 点击编辑菜单
const handleUpdateMenu = (row: permission) => {
    dialogFormVisible.value = true
    menuForm.value.level = row.level
    menuForm.value.pid = row.pid
    menuForm.value.id = row.id
    menuForm.value.name = row.name
    menuForm.value.code = row.code
}
// 点击添加/编辑对话框的确认按钮
const confirmAddOrUpdate = async () => {
    let res = await addOrUpdatePermission(menuForm.value)
    if (res.code == 200) {
        dialogFormVisible.value = false
        ElMessage({
            message: menuForm.value.id ? '修改成功' : '添加成功',
            type: 'success',
            center: true,
            showClose: true
        })
        getAllPermission()
    } else {
        dialogFormVisible.value = false
        ElMessage({
            message: res.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }
}
</script>

<style scoped></style>