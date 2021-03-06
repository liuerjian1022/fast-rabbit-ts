// 路由文件
import {createRouter, createWebHashHistory } from 'vue-router'
import Layout from "@/views/layout/index.vue"
import Home from "@/views/home/index.vue"

const router = createRouter({
    history:createWebHashHistory(),
    // 路由跳转的时候定位到 顶部
    scrollBehavior:() =>{
        return {
            top :0,
        }

    },
    routes:[
        {
            path:'/',
            component:Layout,
            children:[
               {
                path:'',
                component:Home
               },
               {
                   path:'/category/:id',
                   component:() => import('@/views/category/index.vue')
               }
               ,
               {
                   path:'/category/sub/:id',
                   component:() => import('@/views/category/sub.vue')
               }
            ]
        },  
        {
            path:'/login',
            component:()=>import('@/views/login/index.vue')
         }
    ]
})

export default router