<script setup>
import addList from './components/addList.vue'
import dayjs from 'dayjs'
import {ref,onMounted} from 'vue'
import 'dayjs/locale/zh-cn' // 导入中文本地化
import newTask from './components/newTask.vue'
dayjs.locale('zh-cn') // 设置为中文

//获取当前时间
const currentDate = ref('')
const updateDate = () => {
  currentDate.value = dayjs()
    .format('M月DD日, dddd')
}
onMounted(() => {
  updateDate()
})
</script>

<template>
  <div class="container">
   <div class="title">
      <p class="section">我的一天</p>
      <p class="date">{{currentDate}}</p>
   </div>
   <div class="tasklist">
      <newTask></newTask>
   </div>
   <div class="addlist">
       <addList></addList>
   </div>
  </div>
</template>

<style scoped lang="scss">
   .container{
      width: 1300px;
      height:700px;
      background: #edd4c2;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title{
         .section{
            font-size: 30px;
            color: white;
            font-weight: bolder;
         }
         .date{
            font-size: 15px;
            color: white;
            margin-top: -30px;
         }
         margin-left: 50px;
         margin-bottom: 20px;
      }
      .tasklist{
         width: 1000px;
         height: 100%;
         margin: 0 auto;
         
      }
      .addlist{
         margin: 0 auto;
         margin-bottom: 30px;
      }
   }
</style>