<script setup>
import { ref , computed } from "vue";
import dayjs from "dayjs"
import { onClickOutside } from '@vueuse/core'
import { useTaskStore } from "@/stores/taskStore";
const taskStore = useTaskStore();
const alertRef = ref(null)
//选择提醒时间
import timePick from './timePick.vue'
const isSelect = ref(false)
//选择提醒时间
//1.显示菜单中的时间
//今天晚些时候,在现在的时间+4h
const alertToday = dayjs().startOf('day').add(4,'hour')
const today = dayjs().add(4,'hour').format('HH:00')
//明天9点
const alertNext = dayjs().add(1, 'day').hour(9).minute(0);
const weekNum = dayjs().day()
const weekMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const nextday = `${weekMap[weekNum+1]}`+`,${alertNext.format('HH:00')}`
//下周9点
const alertWeek = dayjs().add(7,'day').hour(9).minute(0)
const nextWeek = `${weekMap[weekNum]}`+`,${alertWeek.format('HH:00')}`
//2.添加提醒时间
const alertTime = ref(null)
const getAlertTime = (val1,val2) => {
    showAlert.value = val1
    alertTime.value = val2
     postAlert()
    console.log('提醒时间',val1,alertTime.value)
}
//3.在导航栏将选择的时间显示出来
const showAlert = ref(null)
const selectAlertTime = (num)=>{
    switch(num){
        case 1:
           showAlert.value="今天晚些时候提醒"
           alertTime.value = alertToday
            postAlert()
            break
        case 2:
            showAlert.value="明天"
            alertTime.value = alertNext
            postAlert()
            break
        case 3:
            showAlert.value="下周"
            alertTime.value = alertWeek
            postAlert()
            break
    }
}
const toggleSelect = () => {
     isSelect.value = !isSelect.value
}

onClickOutside(alertRef, () => {
  if (isSelect.value) isSelect.value = ''
})

const emit = defineEmits(['get-alert'])
const postAlert = ()=>{
     emit('get-alert',alertTime.value)
     if (props.tid) {
    const task = taskStore.getTaskByTid(props.tid);
    task.alertdate = alertTime.value;
    console.log('更新', task.alertdate)
  }
}

// 暴露重置方法
const resetAlertData = () => {
  showAlert.value = null;
  alertTime.value = null;
};

// 添加 defineExpose
defineExpose({
  resetAlertData
});

//删除时间选择
const delect = ()=>{ 
   alertTime.value = null;
   showAlert.value = null;
   if (props.tid) {
    const task = taskStore.getTaskByTid(props.tid);
    task.alertdate = null;
  }
}
const isDelect = computed(()=>{
    if (props.tid) {
    return true
  }else{
     return false
  }
})

const props = defineProps({
     positionX:String,
     positionY:String,
     tid:Number
})

</script>

<template>
<div class="alertDate">
      <div class="selectAlert" v-show="isSelect" ref="alertRef" :style="{ right: props.positionX, top: props.positionY }">
            <div @click="selectAlertTime(1)"><div><i class="iconfont icon-daichuli"></i>今日晚些时候</div><span>{{today}}</span></div>
            <div @click="selectAlertTime(2)"><div><i class="iconfont icon-mingtian1"></i>明天</div><span>{{nextday}}</span></div>
            <div @click="selectAlertTime(3)"><div><i class="iconfont icon-xiazhou1"></i>下周</div><span>{{nextWeek}}</span></div>
            <div><div style="width:150px;"><timePick class="timePick" @getAlertTime="getAlertTime"></timePick></div></div>
            <div v-show="alertTime || isDelect" @click="delect"><div style="color:red"><i class="iconfont icon-a-shanchu1"></i>删除提醒</div></div>
        </div>
        <el-tooltip
                content="提醒我"
                placement="top"
                 effect="light"
            >
           <div class="alert"> <i class="iconfont icon-naozhong" @click="toggleSelect"></i><span>{{props.tid ? '': showAlert}}</span></div>
             </el-tooltip>
</div>
</template>

<style lang="scss" scoped>
.alertDate{
      z-index: 1000;
     position: relative;
     .alert {
  display: flex;
  align-items: center;
  span {
    font-size: 14px;
    color: #6f6f6f;
    margin-right: 10px;
  }
  .iconfont {
    margin-right: 10px;
    font-size: 20px;

    &:hover {
      cursor: pointer;
      color: #353535;
    }
  }
}
 .selectAlert{
            width: 300px;
            background: #f6f1eb;
            position: absolute;
             bottom: 40px;
            left: -140px;
            color: #353535;
            font-size: 15px;
            border-radius: 5px;
            .select{
                margin-left: -20px;
                color: #353535;
                width: 250px;
            }
            div:nth-child(4) {
                border-top: 1px solid rgb(202, 202, 202);
                    }
            .timePick{
               margin-left: 12px;
            }
            >div{
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                 background: #f6f1eb;
                div{
                    width: 130px;
                    display: flex;
                    justify-content: flex-start;
                }
                 &:hover{
                    background: #ffffff;
                }
            }
            span{
                color: #919191;
            }
         }
}
.icon-daichuli, .icon-mingtian1, .icon-xiazhou1 ,.icon-a-shanchu1{
  margin-right: 10px;
      margin-top: 2px;
}

</style>