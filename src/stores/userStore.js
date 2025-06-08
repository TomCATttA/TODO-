import { defineStore } from "pinia";
import { loginApi } from "../apis/user";
import { ref } from "vue";
export const useUserStore = defineStore('user',()=>{
    //1.定义用户数据
    const userInfo = ref({})
    //2.定义获取用户数据的方法
    const getUserInfo = async ({account,password})=>{
          const res = await loginApi({account,password})
          userInfo.value = res.data.result
    } 
    //3.返回数据和方法
    return{
        userInfo,
        getUserInfo
    }
},
  {
    persist: true,
  })