<template>
    <div id="user">
        <el-card style="padding: 20px 0 0;">
            <el-form inline>
                <el-form-item label="用户名:">
                    <el-input placeholder="请输入用户名" style="width: 200px;" v-model="keyword"/>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchUser" type="info" plain icon="Search" :disabled="keyword.trim().length?false:true">查询</el-button>
                    <el-button type="info" icon="Switch" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 20px;">
            <el-button type="info" plain icon="Plus" @click="addUser">新增用户</el-button>
            <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                                icon-color="#626AEF" :title="`确定删除吗?`" @confirm="handleDeleteAll">
                                <template #reference>
                                    <el-button type="info" icon="delete" :disabled="deleteIdList.length?false:true">删除用户</el-button>
                                </template>
                            </el-popconfirm>
            <el-table border :data="userList" style="margin-top: 20px;" stripe @select="select">
                <el-table-column type="selection" width="70" align="center" />
                <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                <el-table-column prop="id" label="id" width="150" align="center" />
                <el-table-column prop="name" label="名字" width="180" align="center" />
                <el-table-column prop="username" label="用户名" width="180" align="center" />
                <el-table-column prop="roleName" show-overflow-tooltip label="用户角色" width="180" align="center" />
                <el-table-column prop="createTime" show-overflow-tooltip label="创建时间" align="center" />
                <el-table-column prop="updateTime" show-overflow-tooltip label="更新时间" align="center" />
                <el-table-column label="操作" width="350" align="center">
                    <template #="{ row }">
                        <div style="width: 100%;height: 100%; display: flex;justify-content: center;">
                            <el-button icon="user" @click="asRoles(row)">分配角色</el-button>
                            <el-button type="info" plain icon="Edit" @click="editUser(row)">编辑</el-button>
                            <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                                icon-color="#626AEF" :title="`确定删除吗?`" @confirm="handleDelete(row)">
                                <template #reference>
                                    <el-button type="info" icon="delete">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 20px;" v-model:current-page="currentPage" v-model:page-size="pageLimit"
                :page-sizes="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]" :small="false" :background="false"
                layout="  jumper, prev, pager, next,->,total, sizes" :total="total" @size-change="getAllUserList"
                @current-change="getAllUserList" />
        </el-card>
        <!-- 对话框组件，修改/添加用户 -->
        <el-dialog v-model="dialogTableVisible" width="700px">
            <template #header>
                <h1>{{ userParams.id ? "修改信息" : "添加用户" }}</h1>
            </template>
            <el-form label-position="top" :model="userParams" :rules="rules" ref="formRef">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="userParams.name" placeholder="请输入姓名" style="width: 300px;" />
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userParams.username" placeholder="请输入用户名" style="width: 300px;" />
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="!userParams.id">
                    <el-input v-model="userParams.password" placeholder="请输入密码" style="width: 300px;" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span>
                    <el-button type="info" plain @click="cacel">取消</el-button>
                    <el-button
                        :disabled="!(userParams.name?.trim().length && userParams.username.trim().length && userParams.password.trim().length)"
                        type="info" @click="handleConfirm">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 抽屉组件，分配角色 -->
        <el-drawer ref="drawerRef" v-model="drawerVisible" class="demo-drawer">
            <template #header>
                <h1 style="font-weight: bold;">分配角色</h1>
            </template>
            <el-form label-position="top">
                <el-form-item label="用户名">
                    <el-input disabled v-model="userParams.username" />
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-checkbox v-model="checkAll" @change="handleCheckAllChange" style="margin: 0 20px;">全选</el-checkbox>
                    <br>
                    <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
                        <el-checkbox v-for="item in roles" :key="item.id" :label="item">
                            {{ item.roleName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

            </el-form>
            <template #footer>
                <div style="flex: auto">
                    <el-button type="info" plain @click="comfirmRoles">确定</el-button>
                    <el-button type="info" @click="drawerVisible = false">取消</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { getAllUser, addOrUpdateUser, getAllRoles, assignRoles, deleteUser ,deleteBatchUser} from '@/api/acl/user/index'
import { userResData, userInfo, user, userRole } from '@/api/acl/user/type'
import { ElMessage, ElLoading } from 'element-plus';
import { InfoFilled } from '@element-plus/icons-vue'
import useSettingStore from '@/store/modules/setting'
let settingStore = useSettingStore()
let currentPage = ref<number>(1)
let pageLimit = ref<number>(5)
let total = ref<number>(10)
let userList = ref<userInfo[]>([])
// 收集用户信息
let userParams = ref<user>({
    id: '',
    username: '',
    password: '',
    name: '',
})
// 表单实例
let formRef = ref<any>()
// 对话框显示
let dialogTableVisible = ref<boolean>(false)
// 抽屉显示
let drawerVisible = ref<boolean>(false)
// 多选框
let checkAll = ref<boolean>(false)
// 角色数组
let checkedRoles = ref<any>([])//已勾选的角色

let roles = ref<any>([])//所有角色
// 收集批量删除的用户id
let deleteIdList = ref<any[]>([])
// 搜索用户
let keyword = ref<string>('')
onMounted(() => {
    getAllUserList()
})
// 密码的校验规则
const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('密码不能为空'))
    } else {
        if (value.trim().length < 6) {
            callback(new Error('密码长度至少大于5位'))
        }
        callback()
    }
}
// 校验规则
let rules = ref<any>({
    name: [
        { required: true, message: '名字不能为空', trigger: 'blur' },
        { min: 5, max: 8, message: '名字长度应在5-8位', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 2, max: 15, message: '用户名长度应在2-15位', trigger: 'blur' },
    ],
    password: [

        { validator: validatePass, trigger: 'blur' }
    ],

})

//获取全部用户 
const getAllUserList = async () => {
    try {
        let res: userResData = await getAllUser(currentPage.value, pageLimit.value,keyword.value)
        if (res.code == 200) {
            currentPage.value = res.data.current
            pageLimit.value = res.data.size
            total.value = res.data.total
            userList.value = res.data.records
        }
    } catch (err: any) {
        ElMessage({
            message: err.message,
            type: 'error',
            center: true,
            showClose: true
        })
        console.log(err)
    }

}
// 点击添加用户
const addUser = () => {
    dialogTableVisible.value = true
    Object.assign(userParams.value, { id: '', username: '', password: '', name: '' })
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })
}
// 点击编辑用户
const editUser = (row: userInfo) => {
    dialogTableVisible.value = true
    Object.assign(userParams.value, row)
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
    })

}
// 点击分配角色
const asRoles = async (row: userInfo) => {
    drawerVisible.value = true
    Object.assign(userParams.value, row)

    let res = await getAllRoles(row.id as number)
    if (res.code == 200) {
        roles.value = res.data.allRolesList
        checkedRoles.value = res.data.assignRoles
    } else {
        ElMessage({
            message: res.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }
}
// 点击取消按钮退出对话框
const cacel = () => {
    dialogTableVisible.value = false
}
// 点击确认按钮，新增/修改用户信息
const handleConfirm = async () => {
    await formRef.value.validate()
    const loadingInstance = ElLoading.service({ target: '#user', text: 'loading' })
    try {
        let res: any = await addOrUpdateUser(userParams.value)
        if (res.code == 200) {
            ElMessage({
                message: userParams.value.id ? '修改成功' : '添加成功',
                type: 'success',
                center: true,
                showClose: true
            })
            getAllUserList()
            loadingInstance.close()
            dialogTableVisible.value = false
            window.location.reload()
        } else {
            loadingInstance.close()
            ElMessage({
                message: res.message,
                type: 'warning',
                center: true,
                showClose: true
            })
            dialogTableVisible.value = false
        }
    } catch (err: any) {
        loadingInstance.close()
        ElMessage({
            message: err.message,
            type: 'error',
            center: true,
            showClose: true
        })
        dialogTableVisible.value = false
    }
}
// 多选
const handleCheckedRolesChange = (val: any) => {
    console.log(val)
    if (val.length === roles.value.length) {
        checkAll.value = true
    } else {
        checkAll.value = false
    }
}
// 角色全选
const handleCheckAllChange = (val: any) => {
    checkedRoles.value = val ? roles.value : []
}
// 点击角色分配的确定按钮
const comfirmRoles = async () => {
    let userRolesData: userRole = {
        roleIdList: checkedRoles.value.map((item: any) => item.id),
        userId: userParams.value.id as number,
    }
    let res = await assignRoles(userRolesData)
    if (res.code == 200) {
        ElMessage({
            message: '分配成功',
            type: 'success',
            center: true,
            showClose: true
        })
        drawerVisible.value = false
        getAllUserList()
    } else {
        ElMessage({
            message: res.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }
}
// 点击确认删除
const handleDelete = async (row: any) => {

    try {
        let res = await deleteUser(row.id)
        if (res.code == 200) {
            console.log(res)
            ElMessage({
                message: '删除成功',
                type: 'success',
                center: true,
                showClose: true
            })
            getAllUserList()
        } else {
            ElMessage({
                message: res.message,
                type: 'warning',
                center: true,
                showClose: true
            })
        }
    } catch (error: any) {
        ElMessage({
            message: error.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }
}
// 表格select事件
const select = (selection:any)=>{

    deleteIdList.value = selection
    nextTick(()=>{
        console.log(deleteIdList.value)
    })
}
// 确定批量删除
const handleDeleteAll = async ()=>{
    let ids = deleteIdList.value.map(item=>item.id)

    try {
        let res = await deleteBatchUser(ids)
        if (res.code == 200) {
            console.log(res)
            ElMessage({
                message: '删除成功',
                type: 'success',
                center: true,
                showClose: true
            })
            getAllUserList()
        } else {
            console.log(res)
            ElMessage({
                message: res.message,
                type: 'warning',
                center: true,
                showClose: true
            })
        }
    } catch (error: any) {
        ElMessage({
            message: error.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }
}
// 点击搜索用户
const searchUser = ()=>{
    getAllUserList()
    // 清空关键字
    keyword.value = ''
}
// 点击重置按钮
const reset = ()=>{
    settingStore.refresh = !settingStore.refresh
}
</script>

<style scoped></style>