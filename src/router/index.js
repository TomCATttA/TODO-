// createRouter : 创建router实例对象
// createWebHistory : 创建history模式的路由 路径带有#
import {createRouter,createWebHistory} from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from "../views/Login/index.vue"
import Myday from "../views/Schedul/Myday.vue"
const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
     routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Myday,
        }
      ]
    },
    {
       path: '/login',
      component: Login,
    }
  ]
})
export default router
