<script setup>
import { computed, nextTick, ref } from "vue"
import {useTaskStore} from '@/stores/taskStore'
import { onClickOutside } from '@vueuse/core'
//选择截止时间
import selectDeadLine from './selectDeadLine.vue'
//提醒我
import selectAlertDate from './selectAlertDate.vue'
//重复
import selectRepeatDay from './selectRepeatDay.vue'

import dayjs from "dayjs"

const clearDate = ref(null)
const inputList = ref(null)
const isOpenInput = ref(true)
const isOpenEdit = ref(false)
const task = ref(null)
const taskStore = useTaskStore()
const isSelect = ref(null)

//打开编辑
const openAdd = ()=>{
    isOpenInput.value = false
    nextTick(()=>{
        inputList.value.focus()
    })
}

//如果没有填写内容则关闭编辑
const closeAdd = ()=>{
    if(!task.value){
        isOpenInput.value = true
    }
}

//添加任务
const addTask = (e)=>{
    let mission = null
    if(e.key){
        isOpenEdit.value = true
      if(e.key === 'Enter' && task.value){
        const tid = crypto.randomUUID()
            mission = {
                'sort': 'myday',
                'tid': tid,
                'date': dayjs().format('YYYY-MM-DD'), // 使用格式化日期
                'title': task.value,
                'deadline': selectDay.value || null, // 空值处理
                'alertdate': alertTime.value || null, // 空值处理
                'repeatdate': repeatTime.value || null // 空值处理
            }
        clearDate.value = ''
        taskStore.addTask(mission)
        console.log("提交",taskStore.task)
        task.value = ''
        // selectDate.value = ''
        resetAlert();
        isOpenEdit.value=false
     }
    }
    
}

const repeatRef = ref(null)

 //截止日期
const selectDay = ref(null)
// 提醒日期
const alertTime = ref(null)
// 重复时间
const repeatTime = ref(null)


//获取截止时间
const getDeadLine = (val) => {
    selectDay.value = val
    console.log("截止日期",selectDay.value)
}
// 获取提醒时间
const getAlert = (val) => {
    alertTime.value = val
    console.log("提醒日期",alertTime.value)
}
// 获取重复时间
const getRepeat = (val) => {
    repeatTime.value = val
     console.log("重复时间",repeatTime.value)
}

//清空时间
const selectAlertDateRef = ref(null);
const selectDeadlineRef = ref(null);
const selectRepeatDateRef = ref(null)
// 添加重置方法
const resetAlert = () => {
  selectRepeatDateRef.value?.resetRepeatData()
  selectAlertDateRef.value?.resetAlertData();
  selectDeadlineRef.value?.resetDeadlineData();
  alertTime.value = null;
  selectDay.value = null;
  repeatTime.value = null;
};

</script>

<template>
  <div class="list" @click="openAdd">
      <div class="addlist" v-show="isOpenInput">
        <i class="iconfont icon-jiahao"></i>
        <span>添加任务</span>
      </div>
      <div class="listInfo" v-show="!isOpenInput">
         <i class="iconfont icon-yuanxingweixuanzhong"></i>
         <input ref="inputList" v-model="task" type="text" @blur="closeAdd" @keydown="addTask">
          <div class="date" v-show="isOpenEdit">
            <!-- 截止时间 -->
            <div><selectDeadLine @getDeadLine = "getDeadLine" ref="selectDeadlineRef"></selectDeadLine></div>
            <!-- 提醒我 -->
            <div><selectAlertDate @getAlert = "getAlert" ref="selectAlertDateRef"></selectAlertDate></div>
            <!-- 重复 -->
            <div><selectRepeatDay @getRepeat = "getRepeat" ref="selectRepeatDateRef"></selectRepeatDay></div>
          </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
   .list{
        cursor: default;
         height: 45px;
         border-radius: 5px;
        width: 100%;
        position: relative;
         background: #f6f1eb;
        // .selectRepeat{
        //     width: 180px;
        //     height: 300px;
        //     background: #f6f1eb;
        //     position: absolute;
        //      bottom: 50px;
        //     color: #353535;
        //     font-size: 15px;
        //     border-radius: 5px;
        //     .icon-jintian,.icon-mingtian,.icon-xiazhou{
        //         margin-right: 5px;
        //     }
        //     .select{
        //         margin-right: 10px;
        //         color: #353535;
        //     }
        //     div{
        //         height: 50px;
        //         display: flex;
        //         align-items: center;
        //         justify-content: space-between;
        //         padding: 0 10px;
        //         div{
        //             width: 100px;
        //             display: flex;
        //             justify-content: flex-start;
        //             .iconfont{
        //                 margin-right: 20px;
        //             }
                    
        //         }
        //           &:hover{
        //             background: #ffffff;
        //         }
        //     }
        //     span{
        //         color: #919191;
        //     }
        //  }
         .addlist{
            margin-left: 20px;
            font-size: 16px;
            height: 100%;
            display: flex;
            align-items: center;
            span{
                color: #5a5a5a;
                margin-left: 10px;
            }
         }
         .listInfo{
            margin-left: 20px;
            height: 100%;
            display: flex;
            align-items: center;
            .iconfont{
                font-size: 25px;
                margin-right: 5px;
            }
            input{
                height: 40px;
                font-size: 16px;
                border: none;
                outline: none;
                background: #5a5a5a00;
                width: 100%;
            }
            .date{
                width: 900px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                div{
                    display: flex;
                    align-items: center;
                }
                span{
                    font-size: 14px;
                    color: #6f6f6f;
                    margin-right: 10px;
                }
                .iconfont{
                   margin-right: 15px;
                   &:hover{
                    cursor: pointer;
                    color: #353535;
                   }
                }
            }
         }
        &:hover{
                background: #f1e9e1;
        }
   }
</style>