<script setup>
import addList from './components/addList.vue'
import dayjs from 'dayjs'
import {ref,onMounted, watch} from 'vue'
import drawer from './components/drawer.vue'
import 'dayjs/locale/zh-cn' 
import newTask from './components/newTask.vue'
import {useRoute} from 'vue-router'
import {useListApi} from '@/apis/list'
import {useListStore} from '@/stores/listStore'
const listStore = useListStore()
dayjs.locale('zh-cn') 
const route = useRoute()
const isdrawer = ref(false)
const lid = ref(null)
const gid = ref(null)
//获取当前时间
const currentDate = ref('')
const taskId = ref()
const title = ref(null)
const getName = ()=>{
    lid.value  = parseInt(route.params.subId)
    gid.value = parseInt(route.params.id) 
    title.value = listStore.getTitle(lid.value,gid.value)
}
const updateDate = () => {
  currentDate.value = dayjs()
    .format('M月DD日, dddd')
}
const useDrawer = (drawer,id)=>{
   isdrawer.value = drawer
   taskId.value = id
}

watch(route,()=>{
    getName()
})
onMounted(() => {
    getName()
  updateDate()
})
</script>

<template>
  <div class="container">
   <div class="main-content" :style="{ width: isdrawer ? '700px' : '1000px' }">
      <div class="title">
            <p class="section">{{title}}</p>
            <p class="date">{{currentDate}}</p>
         </div>
         <div class="tasklist">
            <newTask :sort='`list${lid}`' @get-drawer="useDrawer"></newTask>
         </div>
         <div class="addlist">
            <addList :sort='`list${lid}`'></addList>
         </div>
   </div>
   <div class="drawer" :style="{ width: isdrawer ? '350px' : '0px' }" v-if="isdrawer">
      <drawer  @get-drawer="useDrawer" :tid="taskId"></drawer>
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
      justify-content: space-between;
      .main-content{
         height: 650px;
         margin-left: 35px;
         .title{
               height: 70px;
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
                  margin-bottom: 30px;
               }
               .tasklist{
                  height: 500px;
                  
               }
               .addlist{
                  height: 70px;
                  margin-bottom: 30px;
               }
      }
      .drawer{
         height: 700px;
         border-radius: 5px;
         margin-left: 25px;
      }
   }
</style>