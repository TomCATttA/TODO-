<script setup>
   import defineRepeat from './defineRepeat.vue'
   import { onClickOutside } from '@vueuse/core'
   import {ref} from 'vue'
   import { useTaskStore } from "@/stores/taskStore";
const taskStore = useTaskStore();
   const isSelect = ref(null)
   const repeatRef = ref(null)
   onClickOutside(repeatRef, () => {
    if (isSelect.value) {
            isSelect.value = ''
            isOpen.value = false
    }
})
    //选择重复
const repeatDay = ref(null)
// const repeadDate = ref(null)
const select = (num)=>{
    switch(num){
        case 1 :
            repeatDay.value = '每天'
            postRepeatDate()
            break
        case 2:
            repeatDay.value = '每周'
            postRepeatDate()
            break
        case 3:
            repeatDay.value = '每月'
            postRepeatDate()
            break
        case 4:
            repeatDay.value = '每年'
            postRepeatDate()
            break

    }
}
//自定义重复
const isOpen = ref(false)
const open = ()=>{
    isOpen.value = true
}

//获取自定义
const getDate = (val1,val2)=>{
    repeatDay.value = val1
    isOpen.value = val2
    postRepeatDate()
}
//将重复时间传给父组件
const emit = defineEmits(['get-repeat'])
const postRepeatDate = ()=>{
    emit('get-repeat',repeatDay.value)
         if (props.tid) {
    const task = taskStore.getTaskByTid(props.tid);
    task.repeatdate = repeatDay.value;
  }
}

//清除
const resetRepeatData =()=>{
    repeatDay.value = null;
    emit('get-repeat', null);
    console.log('清除')
}
defineExpose({
  resetRepeatData,
});

const props = defineProps({
     positionX:String,
     positionY:String,
     tid:Number
})

const delect = ()=>{ 
   repeatDay.value = null;
   if (props.tid) {
    const task = taskStore.getTaskByTid(props.tid);
    task.repeatdate = null;
  }
}
</script>

<template>
    <div class="selectDay">
         <el-tooltip
                placement="top"
                 effect="light"
            >
            <template #content>重复<br />打开重复周期选取器以选择任务重复周期</template>
            <div> <i class="iconfont icon-24gl-repeatDot" @click="isSelect=true"></i><span>{{props.tid ? '': repeatDay}}</span></div>
             </el-tooltip>
         <div class="selectRepeat" v-show="isSelect" ref="repeatRef" :style="{ right: props.positionX, top: props.positionY }">
            <div @click="select(1)"><div><i class="iconfont icon-meirirenwu"></i>每天</div></div>
            <div @click="select(2)"><div><i class="iconfont icon-meizhou"></i>每周</div></div>
            <div @click="select(3)"><div><i class="iconfont icon-meiyue"></i>每月</div></div>
            <div @click="select(4)"><div><i class="iconfont icon-meinian"></i>每年</div></div>
            <div @click="open"><div><defineRepeat @sendDate = getDate :useOpen = "isOpen"></defineRepeat></div></div>
            <div @click="delect"><div style="color:red"><i class="iconfont icon-a-shanchu1"></i>删除重复</div></div>
        </div>
    </div>

</template>

<style scoped lang="scss">
            .selectDay{
                z-index: 98;
                position: relative;
                .icon-24gl-repeatDot{
                    margin-right: 10px;
                     margin-left: 5px;
                }
                            span{
                color: #919191;
                margin-right: 10px;
                font-size: 15px;
            }
            }
           .selectRepeat{
            width: 180px;
            height: 300px;
            background: #f6f1eb;
            position: absolute;
            bottom: 40px;
            color: #353535;
            right: 0px;
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

         }
</style>