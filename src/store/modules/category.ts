import { defineStore } from 'pinia'
import  request  from '@/utils/request'
import {ApiRes,CategoryItem,TopCategory,SubCategory} from '@/types/data'
import { topCategory } from '../constants'
const defaultCategory = topCategory.map((item)=>{
  return {
    name:item
  }
})
export default defineStore('category', {
  state: () => ({
    list:defaultCategory as CategoryItem[] ,
    topCategory: {} as TopCategory,
    // 二级分类
    subCategory:{} as SubCategory,
  }),
  actions :{
    async getAllCategory(){
      const res=await request.get<ApiRes<CategoryItem[]>>('/home/category/head')
      // 给每一个节点添加opne属性用来控制导航栏的鼠标经过消失与显示的问题
      res.data.result.forEach((item)=>{
        item.open = false;
      })
      this.list=res.data.result
    },
    // 控制导航栏的显示与隐藏
    show(id:string){
      const category=this.list.find((item) => item.id === id)
      category!.open=true
      
    },
    hide(id: string) {
      const category = this.list.find((item) => item.id === id)
      category!.open = false
    },
    // 获取顶级分类
    async getTopCategory(id: string) {
      const res = await request.get<ApiRes<TopCategory>>('/category', {
        params: {
          id,
        },
      })
      this.topCategory = res.data.result
    },
    // 获取二级分类
    async getSubCategory(id: string) {
      const res= await request.get<ApiRes<SubCategory>>('/category/sub/filter',{
        params: {
          id,
        }
      }
      )
      this.subCategory=res.data.result
    }
  },
  getters :{
    
  }
})
