<template>
    <div id="user">
        <el-card style="padding: 20px 0 0;">
            <el-form inline>
                <el-form-item label="角色名:">
                    <el-input placeholder="请输入角色名" v-model="roleName" style="width: 200px;" />
                </el-form-item>
                <el-form-item>
                    <el-button type="info" plain icon="Search" :disabled="roleName.trim().length ? false : true"
                        @click="searchRoles">查询</el-button>
                    <el-button type="info" icon="Switch" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 20px;">
            <el-button type="info" plain icon="Plus" @click="addRole">新增角色</el-button>

            <el-table border style="margin-top: 20px;" stripe :data="roleList">
                <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                <el-table-column prop="id" label="id" width="150" align="center" />
                <el-table-column prop="roleName" show-overflow-tooltip label="角色名" align="center" />
                <el-table-column prop="createTime" show-overflow-tooltip label="创建时间" align="center" />
                <el-table-column prop="updateTime" show-overflow-tooltip label="更新时间" align="center" />
                <el-table-column label="操作" width="350" align="center">
                    <template #="{ row }">
                        <div style="width: 100%;height: 100%; display: flex;justify-content: center;">
                            <el-button icon="user" @click="openPermission(row)">分配权限</el-button>
                            <el-button type="info" plain icon="Edit" @click="updateRole(row)">编辑</el-button>
                            <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                                icon-color="#626AEF" :title="`确定删除${row.roleName}吗?`" @confirm="deleteRole(row)">
                                <template #reference>
                                    <el-button type="info" icon="delete" >删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 20px;" v-model:current-page="currentPage" v-model:page-size="pageLimit"
                :page-sizes="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]" :small="false" :background="false"
                layout="  jumper, prev, pager, next,->,total, sizes" :total="total" @size-change="getAllRolesList"
                @current-change="getAllRolesList" />
        </el-card>
        <!-- 新增/修改角色的对话框 -->
        <el-dialog v-model="dialogFormVisible" draggable width="600px">
            <template #header>
                <h1>{{ roleForm.id ? "修改角色" : "添加角色" }}</h1>
            </template>
            <el-form>
                <el-form-item label="角色名">
                    <el-input style="width: 200px;" v-model="roleForm.roleName" />
                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="info" @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="info" plain @click="handleConfirm"
                        :disabled="roleForm.roleName?.trim().length ? false : true">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 分配角色抽屉 -->
        <el-drawer v-model="drawerVisible" title="分配角色" direction="rtl" size="40%">
            <!-- 树 -->
            <el-tree :data="roleMenu" default-expand-all show-checkbox node-key="id" 
             :default-checked-keys="hasMenuList"
                :props="defaultProps" @check="handleCheckChange"/>
            <template #footer>
                <el-button type="info" @click="cancelPermission">取消</el-button>
                <el-button type="info" plain @click="handleConfirmPermission">确认</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted ,nextTick} from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { getRoleList, addOrUpdateRole ,getRoleMenu,assignRoleMenu,deleteRoleReq} from '@/api/acl/role/index'
import { roleListResData, roleType ,menuData} from '@/api/acl/role/type'
import { ElMessage } from 'element-plus';
import useSettingStore from '@/store/modules/setting'

let settingStore = useSettingStore()
let currentPage = ref<number>(1)
let pageLimit = ref<number>(5)
let total = ref<number>(0)
// 搜索角色关键字
let roleName = ref<string>('')
// 定义收集角色列表
let roleList = ref<roleType[]>([])
// 定义收集新增/修改角色
let roleForm = ref<roleType>({
    id: '',
    roleName: '',
})
onMounted(() => {
    getAllRolesList()
})
// 对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 抽屉显示隐藏
let drawerVisible = ref<boolean>(false)
// 收集角色菜单信息
let roleMenu = ref<menuData[]>([])
// 角色已有的菜单
let hasMenuList = ref<any>([])
// 菜单展示
const defaultProps = {
    children: 'children',
  label: 'name',
}
// 获取所有角色列表
const getAllRolesList = async () => {
    
    let res: roleListResData = await getRoleList(currentPage.value, pageLimit.value, roleName.value)
    if (res.code == 200) {
        currentPage.value = res.data.current
        pageLimit.value = res.data.size
        total.value = res.data.total
        roleList.value = res.data.records
    } else {
        ElMessage({
            message: res.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }
}

// 查询角色
const searchRoles = () => {
    getAllRolesList()
    roleName.value = ''
}
// 点击重置按钮
const reset = () => {
    settingStore.refresh = !settingStore.refresh
}
// 点击确定删除某个角色
const deleteRole = async (row: roleType) => {
    let res = await deleteRoleReq(row.id as number)
    if(res.code == 200) {
        ElMessage({
            message: '删除成功',
            type: 'success',
            center: true,
            showClose: true
        })
        getAllRolesList()
    }else {
            ElMessage({
                message: res.message,
                type: 'error',
                center: true,
                showClose: true
            })
        }
}
// 点击添加角色按钮
const addRole = () => {
    dialogFormVisible.value = true
    Object.assign(roleForm.value, { id: '', roleName: '', })
}
// 点击确认添加/新增角色
const handleConfirm = async () => {
    let res = await addOrUpdateRole(roleForm.value)
    if (res.code == 200) {
        console.log(res)
        dialogFormVisible.value = false
        ElMessage({
            message: roleForm.value.id ? '修改成功' : '添加成功',
            type: 'success',
            center: true,
            showClose: true
        })
        getAllRolesList()
    } else {
        ElMessage({
            message: res.message,
            type: 'error',
            center: true,
            showClose: true
        })
    }
}
// 点击编辑角色
const updateRole = (row: roleType) => {
    dialogFormVisible.value = true
    roleForm.value.id = row.id
    roleForm.value.roleName = row.roleName

}

// 点击分配角色按钮
const openPermission = async (row: roleType) => {
    hasMenuList.value = []
    drawerVisible.value = true
    roleForm.value.id = row.id
    let res = await getRoleMenu(row.id as number)
    if(res.code == 200){
        console.log(res)
        roleMenu.value = res.data
    }
    hasMenuList.value = filterSelect(roleMenu.value,[])
    nextTick(()=>{
        console.log(hasMenuList.value)

    })
}

// 点击抽屉取消
const cancelPermission = () => {
    drawerVisible.value = false
}
// 过滤出已有的菜单
const filterSelect =(data:any,init:any)=>{
    data.forEach((item:any)=>{
        if(item.children&&item.children.length>0){
            filterSelect(item.children,init)
        }else {
            if(item.select){
                init.push(item.id)
            }
           
        }
    })
    return init
    
}
// 菜单选中
const handleCheckChange =(data:any,status:any)=>{
    hasMenuList.value = status.checkedKeys
}
// 确认分配角色
const handleConfirmPermission = async ()=>{
    let res = await assignRoleMenu(roleForm.value.id as number,hasMenuList.value)
    if(res.code == 200){
        drawerVisible.value = false
        getAllRolesList()
        ElMessage({
            message: '分配成功',
            type: 'success',
            center: true,
            showClose: true
        })
        hasMenuList.value = []
        window.location.reload()
    }else {
        drawerVisible.value = false
        ElMessage({
            message:res.message,
            type:'error',
            center: true,
            showClose: true
        })
        hasMenuList.value = []
    }
}
</script>

<style scoped></style>