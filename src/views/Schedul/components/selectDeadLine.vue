<script setup>
import {useTaskStore} from '@/stores/taskStore'
const taskStore = useTaskStore()
//显示时间
import dateSelect from "./dateSelect.vue"
import { computed,ref } from "vue"
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const weekNum = dayjs().day()
const weekMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const today = weekMap[weekNum]
const nextday = weekMap[weekNum+1]

//获取抽拉内容的位置和tid
const props = defineProps({
    positionX:String,
    positionY:String,
    tid:String
})

//今天
const nowDate = dayjs().startOf('day').add(1, 'day')
//明天
const nextDate = dayjs().startOf('day').add(2, 'day')
//下周
const nextWeekDate = dayjs().startOf('day').add(8, 'day')

//用于展示的截止日期
const selectDate = ref(null)
//用于保存的截止日期
const selectDay = ref(null)

//点击外面关闭菜单
import { onClickOutside } from '@vueuse/core'
const isSelect = ref(null)
const dateRef = ref(null)
onClickOutside(dateRef, () => {
  if (isSelect.value) isSelect.value = ''
})

//打开菜单栏
const open = ()=>{
    if(isSelect.value){
        isSelect.value = false
    }else{
        isSelect.value = true
    }
     if(props.tid){
        const task = taskStore.getTaskByTid(props.tid)
        if(task.deadline){
            selectDay.value = true
        }
    }
}

//选择截至时间
const getDate = (val1,val2)=>{
    selectDate.value = val1
    selectDay.value = val2
    postDeadLine()
}
const getDay = (num) => {
    switch(num){
        case 1:
            selectDate.value = '今天'
            selectDay.value = nowDate
            postDeadLine()
            break
        case 2:
            selectDate.value = '明天'
            selectDay.value = nextDate
            postDeadLine()
            break
        case 3:
            selectDate.value = '下周'
            selectDay.value = nextWeekDate
            postDeadLine()
            break
    }
}
//删除截至时间
const clearSelectDay = () => {
  if(props.tid){
      const task = taskStore.getTaskByTid(props.tid)
      task.deadline = null
       console.log("删除",task.deadline)
  }
  selectDay.value = null
  selectDate.value = null
}
//将截止时间传给父组件
const emit = defineEmits(['get-dead-line'])
const postDeadLine =()=>{
    console.log('触发')
    emit('get-dead-line',selectDay.value,selectDate.value)
    if(props.tid){
        const task = taskStore.getTaskByTid(props.tid)
        task.deadline = selectDay.value
        if(task.deadline){
            selectDay.value = true
        }
        console.log("更新",task.deadline)
    }
}

</script>
<template>
<div class="setDeadLine">
   <div class="selectDate" v-show="isSelect" ref="dateRef" :style="{ right: props.positionX, top: props.positionY }">
            <div @click="getDay(1)"><div><i class="iconfont icon-jintian"></i>今天</div><span>{{today}}</span></div>
            <div @click="getDay(2)"><div><i class="iconfont icon-mingtian"></i>明天</div><span>{{nextday}}</span></div>
            <div @click="getDay(3)"><div><i class="iconfont icon-xiazhou"></i>下周</div><span>周一</span></div>
            <div><div style="width:100px;"><i class="iconfont icon-24gl-calendar"></i><span class="select"><dateSelect @getDate="getDate"></dateSelect></span></div></div>
            <div v-show="selectDay" @click="clearSelectDay"><div style="color:red"><i class="iconfont icon-a-shanchu1"></i>删除截止日期</div></div>
    </div>
     <el-tooltip
                content="添加截止日期"
                placement="top"
                 effect="light"
            >
          <div class="deadline"><i class="iconfont icon-riqi" @click="open"></i><span v-show="!props.tid">{{selectDate}}</span></div>
      </el-tooltip>
</div>
 
</template>

<style scoped lang="scss">
.setDeadLine{
    position: relative;
    
}
.deadline{
    display: flex;
    align-items: center;
    span{
        font-size: 14px;
        color: #6f6f6f;
        margin-right: 10px;
                    }
    .iconfont{
                    margin-right: 10px;
                    font-size: 25px;
                    &:hover{
                        cursor: pointer;
                        color: #353535;
                    }
                    
                    }
}

      .selectDate{
            width: 200px;
            background: #f6f1eb;
            position: absolute;
            color: #353535;
            font-size: 15px;
            left: -80px;
            bottom: 40px;
            border-radius: 5px;
            .icon-jintian,.icon-mingtian,.icon-xiazhou{
                margin-right: 5px;
            }
            .select{
                margin-right: 10px;
                color: #353535;
            }
            div:nth-child(4) {
                border-top: 1px solid rgb(202, 202, 202);
                
                    }
            div{
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                div{
                    width: 120px;
                     display: flex;
                    justify-content: flex-start;
                    .iconfont{
                        margin-right: 10px;
                        font-size: 15px;
                    }
                }
                &:hover{
                    background: #ffffff;
                }
            }
            span{
                color: #919191;
            }
         }
</style>