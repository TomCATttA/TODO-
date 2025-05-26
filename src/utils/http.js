//axios基础封装
import axios from "axios";
import { ElMessage } from "element-plus";

const httpInstance =  axios.create({
    baseURL:'http://todo-list.za.net',
    timeout:5000
})

//拦截器
axios.interceptors.request.use(config => {
    return config;
  },e => Promise.reject(e));

//响应拦截器
axios.interceptors.response.use(response => {
    return response;
  },e =>{ 
    //统一错误提示
    ElMessage({
      type:'warning',
      message:e.response.data.msg
    })
    Promise.reject(e)
  });

export default httpInstance