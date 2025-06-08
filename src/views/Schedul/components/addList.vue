<script setup>
import { computed, nextTick, ref } from "vue"
import {useTaskStore} from '@/stores/taskStore'
import { onClickOutside } from '@vueuse/core'
//选择截止时间
import selectDeadLine from './selectDeadLine.vue'
//提醒我
import selectAlertDate from './selectAlertDate.vue'
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
            'sort':'myday',
            'tid':tid,
            'date':dayjs(),
            'title':`${task.value}`,
            'deadline':`${selectDay.value}`,
            'alertdate':`${alertTime.value}`
        }
        clearDate.value = ''
        taskStore.addTask(mission)
        console.log("提交",taskStore.task)
        task.value = ''
        selectDate.value = ''
        resetAlert();
        isOpenEdit.value=false
     }
    }
    
}

//显示时间
// const alertRef = ref(null)
const repeatRef = ref(null)

 //用于展示的截止日期
const selectDate = ref(null)
 //截止日期
const selectDay = ref(null)
// 提醒日期
const alertTime = ref(null)

const toggleSelect = (num,e) => {
  switch (isSelect.value) {
    case num:
      isSelect.value = -1 
      break
    default:
      isSelect.value = num 
      break
  }
}

onClickOutside(repeatRef, () => {
  if (isSelect.value === 3) isSelect.value = ''
})

//获取截止时间
const getDeadLine = (val1) => {
    selectDay.value = val1
    // selectDate.value = val2
    console.log("截止日期",selectDay.value)
}
// 获取提醒时间
const getAlert = (val) => {
    alertTime.value = val
    console.log("提醒日期",alertTime.value)
}

//清空时间
const selectAlertDateRef = ref(null);
const selectDeadlineRef = ref(null);

// 添加重置方法
const resetAlert = () => {
  selectAlertDateRef.value?.resetAlertData();
  selectDeadlineRef.value?.resetDeadlineData();
  alertTime.value = null;
//   selectDate.value = null;
  selectDay.value = null;
};


</script>

<template>
  <div class="list" @click="openAdd">
        <div class="selectRepeat" v-show="isSelect === 3" ref="repeatRef">
            <div @click="select(1)"><div><i class="iconfont icon-meirirenwu"></i>每天</div></div>
            <div @click="select(2)"><div><i class="iconfont icon-meizhou"></i>每周</div></div>
            <div @click="select(3)"><div><i class="iconfont icon-meiyue"></i>每月</div></div>
            <div @click="select(4)"><div><i class="iconfont icon-meinian"></i>每年</div></div>
            <div><div><i class="iconfont icon-18"></i>自定义</div></div>
            <div><div style="color:red"><i class="iconfont icon-a-shanchu1"></i>删除重复</div></div>
        </div>
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
             <el-tooltip
                placement="top"
                 effect="light"
            >
            <template #content>重复<br />打开重复周期选取器以选择任务重复周期</template>
           <div> <i class="iconfont icon-24gl-repeatDot" @click="toggleSelect(3)"></i><span></span></div>
             </el-tooltip>
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
        .selectRepeat{
            width: 180px;
            height: 300px;
            background: #f6f1eb;
            position: absolute;
             bottom: 50px;
            color: #353535;
            font-size: 15px;
            border-radius: 5px;
            .icon-jintian,.icon-mingtian,.icon-xiazhou{
                margin-right: 5px;
            }
            .select{
                margin-right: 10px;
                color: #353535;
            }
            div{
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                div{
                    width: 100px;
                    display: flex;
                    justify-content: flex-start;
                    .iconfont{
                        margin-right: 20px;
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
                   margin-right: 10px;
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