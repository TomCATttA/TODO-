// createRouter : 创建router实例对象
// createWebHistory : 创建history模式的路由 路径带有#
import {createRouter,createWebHistory} from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from "../views/Login/index.vue"
const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        // 一级路由
        {
            path:'/',
            component:Login,
            //二级路由
            children:[
                {
                    path:'/todo',
                    component:Layout
                }
            ]
        }
    ]
})
export default router
