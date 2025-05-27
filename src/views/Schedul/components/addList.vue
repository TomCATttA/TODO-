<script setup>
import { nextTick, ref } from "vue"

const inputList = ref(null)
const isOpenInput = ref(true)
const isOpenEdit = ref(false)
const task = ref(null)

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
    if(e.key){
        isOpenEdit.value = true
      if(e.key === 'Enter' && task.value){
        console.log("提交")
        task.value = ''
     }
    }
    
}

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
            <i class="iconfont icon-riqi"></i>
            <i class="iconfont icon-naozhong"></i>
            <i class="iconfont icon-24gl-repeatDot"></i>
          </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
   .list{
        cursor: default;
         width: 1000px;
         height: 45px;
         border-radius: 5px;
         background: #f6f1eb;
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
                width: 110px;
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