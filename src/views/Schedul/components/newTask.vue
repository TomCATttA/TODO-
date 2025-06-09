<script setup>
import {useTaskStore} from '@/stores/taskStore'
import {defineProps, onMounted, watch,computed} from 'vue'
import {ref} from 'vue'
import dayjs from "dayjs";
const taskStore = useTaskStore()
const drawer = ref(false)
const props = defineProps({
   sort: String,
})
const task = computed(() => taskStore.showTask(props.sort))
onMounted(()=>{
   task.value = taskStore.showTask(props.sort)
})


// 日期格式化函数
const formatDate = (dateValue) => {
   if (!dateValue) return '';
   const dateObj = dayjs(dateValue);
   if (!dateObj.isValid()) {
       return ''; 
   }
   const currentYear = dayjs().year();
   if (dateObj.year() === currentYear) {
       return dateObj.format('M月D日 , ddd');  
   } else {
       return dateObj.format('YYYY年M月D日 , ddd');  
   }
}

const emit = defineEmits(['get-drawer'])
const isdrawer = (id)=>{
  drawer.value = true
  emit('get-drawer',drawer.value,id)
}

</script>

<template>
  <div class="task" v-for="item in task" :key="item.tid" @click="isdrawer(item.tid)"> 
      <i class="iconfont icon-yuanxingweixuanzhong"></i>
      <div class="title">
         <span class="subTitle">{{item.title}}</span>
         <div class="date">
            <span v-show="formatDate(item.deadline)" class="deadline"><i class="iconfont icon-riqi"></i>  {{item.alertdate ?  formatDate(item.deadline) + '·' : formatDate(item.deadline)}} </span>
            <span v-show="formatDate(item.alertdate)" class="alerttime"><i class="iconfont icon-naozhong"></i>{{ formatDate(item.alertdate)}} </span>
            <span v-show="item.repeatdate" class="repeattime"><i class="iconfont icon-xunhuan"></i></span>
         </div>
      </div>
      
     <i class="iconfont icon-shoucang1"></i>
  </div>
</template>

<style scoped lang="scss">
    .task{
             height: 45px;
             border-radius: 5px;
             background: #f6f1eb;
             width: 100%;
             display: flex;
             align-items: center;
             margin-bottom: 10px;
              .iconfont{
                font-size: 20px;
                margin-left: 10px;
                margin-right: 15px;
            }
            .title{
             width: 100%;
             display: flex;
             flex-direction: column;
                .subTitle{
                 font-size: 15px;
                 cursor: default;
                 color: rgb(59, 59, 59);
            }
            .date{
               .deadline{
                  font-size: 14px;
                   color: rgb(251, 114, 114);
                  .icon-riqi{
                  font-size: 14px;
                   color: rgb(251, 114, 114);
                   margin-left: 0;
                   margin-right: 5px;
                  }
                 
               }
               .alerttime{
                  font-size: 14px;
                  color: rgb(50, 142, 255);
                  .icon-naozhong{
                      font-size: 14px;
                  color: rgb(50, 142, 255);
                   margin-left: 0;
                   margin-right: 5px;
                  }
               }
               .repeattime{
                  .icon-xunhuan{
                     font-size: 14px;
                     color: #aaaaaa;
                  }
               }
            }
            }
          
         }
</style>