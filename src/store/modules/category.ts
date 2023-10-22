import {defineStore} from 'pinia'
import type {category,categoryResDta} from '@/api/product/attr/type.ts'
import type {CategoryState} from './types/types'
import { getAttrOneList, getAttrTwoList, getAttrThreeList ,getAttrInfoList} from '@/api/product/attr/index.ts'
let useCategoryStore = defineStore('category', {
    state: ():CategoryState => {
        return {
            c1Arr:[],
            c1Id: '',
            c2Arr:[],
            c2Id: '',
            c3Arr:[],
            c3Id: '',
        }
    },

    actions: {
        // 获取分类
        async getC1(){
           let res:categoryResDta = await getAttrOneList()
           if(res.code == 200) {
            this.c1Arr = res.data
           }

        },
        // 根据一级分类获取二级分类
        async c1Change(c1Id:number){
            let res:categoryResDta = await getAttrTwoList(c1Id)
            if(res.code == 200) {
                this.c2Arr = res.data
            }
        },
        //根据二级分类获取三级分类 
        async c2Change(c2Id:number){
            let res:categoryResDta = await getAttrThreeList(c2Id)
            if(res.code == 200) {
                this.c3Arr = res.data
            }
        },

        
    },
    getters:{
        
    }

    
})
export default useCategoryStore
