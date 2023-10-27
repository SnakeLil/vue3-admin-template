<template>
    <div id="user">
        <el-card style="padding: 20px 0 0;">
            <el-form inline>
                <el-form-item label="角色名:">
                    <el-input placeholder="请输入角色名" v-model="roleName" style="width: 200px;"/>
                </el-form-item>
                <el-form-item>
                    <el-button  type="info"  plain icon="Search" @click="searchRoles">查询</el-button>
                    <el-button type="info" icon="Switch" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 20px;">
            <el-button type="info" plain icon="Plus" >新增角色</el-button>

            <el-table border style="margin-top: 20px;" stripe :data="roleList">
                <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
                <el-table-column prop="id" label="id" width="150" align="center" />
                <el-table-column prop="roleName" show-overflow-tooltip label="角色名" align="center" />
                <el-table-column prop="createTime" show-overflow-tooltip label="创建时间" align="center" />
                <el-table-column prop="updateTime" show-overflow-tooltip label="更新时间" align="center" />
                <el-table-column label="操作" width="350" align="center">
                    <template #="{ row }">
                        <div style="width: 100%;height: 100%; display: flex;justify-content: center;">
                            <el-button icon="user" >分配权限</el-button>
                            <el-button type="info" plain icon="Edit" >编辑</el-button>
                            <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                                icon-color="#626AEF" :title="`确定删除吗?`" @confirm="">
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
                layout="  jumper, prev, pager, next,->,total, sizes" :total="total" @size-change="getAllRolesList"
                @current-change="getAllRolesList" />
        </el-card>

    </div>
</template>

<script setup lang="ts">
import {ref,onMounted } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import {getRoleList} from '@/api/acl/role/index'
import {roleListResData,roleType} from '@/api/acl/role/type'
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
onMounted(()=>{
    getAllRolesList()
})

// 获取所有角色列表
const getAllRolesList =async ()=>{
    let res:roleListResData = await getRoleList(currentPage.value,pageLimit.value,roleName.value)
    if(res.code == 200){
        console.log(res)
        currentPage.value = res.data.current
        pageLimit.value = res.data.size
        total.value = res.data.total
        roleList.value = res.data.records
    }else {
        ElMessage({
            message: res.message,
            type: 'error',
            center:true,
            showClose:true
        })
    }
}
// 查询角色
const searchRoles = ()=>{
    getAllRolesList()
    roleName.value = ''
}
// 点击重置按钮
const reset = ()=>{
    settingStore.refresh = !settingStore.refresh
}
</script>

<style scoped>

</style>