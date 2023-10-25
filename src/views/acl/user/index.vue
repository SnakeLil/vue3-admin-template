<template>
    <div>
        <el-card style="padding: 20px 0 0;">
            <el-form inline>
                <el-form-item label="用户名:">
                    <el-input placeholder="请输入用户名" style="width: 200px;" />
                </el-form-item>
                <el-form-item>
                    <el-button type="info" plain icon="Search">查询</el-button>
                    <el-button type="info" icon="Switch">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 20px;">
            <el-button type="info" plain icon="Plus" @click="addUser">新增用户</el-button>
            <el-button type="info" icon="Delete">删除</el-button>
            <el-table border :data="userList" style="margin-top: 20px;" stripe>
                <el-table-column type="selection" width="70" align="center" />
                <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                <el-table-column prop="id" label="id" width="150" align="center" />
                <el-table-column prop="name" label="名字" width="180" align="center" />
                <el-table-column prop="username" label="用户名" width="180" align="center" />
                <el-table-column prop="roleName" label="用户角色" width="180" align="center" />
                <el-table-column prop="createTime" show-overflow-tooltip label="创建时间" align="center" />
                <el-table-column prop="updateTime" show-overflow-tooltip label="更新时间" align="center" />
                <el-table-column label="操作" width="350" align="center">
                    <template #="{ row }">
                        <div style="width: 100%;height: 100%; display: flex;justify-content: center;">
                            <el-button icon="user">分配角色</el-button>
                            <el-button type="info" plain icon="Edit" @click="editUser(row)">编辑</el-button>
                            <el-button type="info" icon="Delete">删除</el-button>
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
        <el-dialog v-model="dialogTableVisible" title="添加用户" width="700px">
            <el-form label-position="top">
                <el-form-item label="姓名" prop="email">
                    <el-input placeholder="请输入姓名" style="width: 300px;" />
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" style="width: 300px;" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" style="width: 300px;" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span>
                    <el-button type="info" plain @click="cacel">取消</el-button>
                    <el-button type="info" >
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllUser } from '@/api/acl/user/index'
import { userResData, userInfo } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus';
let currentPage = ref<number>(1)
let pageLimit = ref<number>(5)
let total = ref<number>(10)
let userList = ref<userInfo[]>([])

// 对话框显示
let dialogTableVisible = ref<boolean>(false)
onMounted(() => {
    getAllUserList()
})

//获取全部用户 
const getAllUserList = async () => {
    try {
        let res: userResData = await getAllUser(currentPage.value, pageLimit.value)
        console.log(res)
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
}
// 点击编辑用户
const editUser = (row: userInfo) => {
    dialogTableVisible.value = true
}
// 点击取消按钮退出对话框
const cacel =()=>{
    dialogTableVisible.value = false
}
</script>

<style scoped></style>