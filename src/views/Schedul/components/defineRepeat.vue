<script setup>
   import {defineProps,ref,defineEmits} from 'vue'
   import { onClickOutside } from '@vueuse/core'
    const props = defineProps({
        useOpen:Boolean
    })

    //打开选择单位
    const isOpen = ref(false)
    onClickOutside('selectUnitRef',()=>{
         isOpen.value = false
    })

    //隔多久重复
    const repeatDate = ref(1)
    const repeatUnit = ref('天')
    //选择单位
    const select = (num) => {
        switch(num){
            case 1:
                repeatUnit.value = '天'
                break
            case 2:
                repeatUnit.value = '周'
                break
            case 3:
                repeatUnit.value = '月'
                break
            case 4:
                repeatUnit.value = '年'
                break
        }
        isOpen.value = false
    }
    const emit = defineEmits(['send-date'])
   const sendDate = () => {
        const number = Math.floor(repeatDate.value)
        if(number > 0 ){
            emit('send-date','每'+' '+number+' '+repeatUnit.value,false)
        }
        isOpen.value = false
   }
   const close = () => {
        emit('send-date',null,false)
   }
   
</script>

<template>
  <div class="selectDay">
    <div><i class="iconfont icon-18"></i><span>自定义</span></div>
    <div class="select" v-if="props.useOpen">
        <p class="title">选择重复周期</p>
        <div class="input">
            <input type="text" @click.stop v-model="repeatDate">
            <div class="unit" @click="isOpen=true">
                <p class="date">{{repeatUnit}}</p>
                <i class="iconfont icon-zhankai"></i>
                <div class="selectUnit" v-if="isOpen" ref="selectUnitRef">
                    <div @click.stop="select(1)" :class="{active:repeatUnit==='天'}">天</div>
                    <div @click.stop="select(2)" :class="{active:repeatUnit==='周'}">周</div>
                    <div @click.stop="select(3)" :class="{active:repeatUnit==='月'}">月</div>
                    <div @click.stop="select(4)" :class="{active:repeatUnit==='年'}">年</div>
                </div>
            </div>
        </div>
        <div class="btn">
            <button @click.stop = close style="margin-right:8px">取消</button>
            <button @click.stop = sendDate>确认</button>
        </div>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
    .selectDay{
        position: relative;
        .icon-18{
            margin-right: 15px;
            margin-left: -10px;
        }
           }
        .select{
                position: absolute;
                width: 200px;
                height: 140px;
                left: -20px;
                background: #f6f1eb;
                box-shadow: 0 0 4px rgba(201, 201, 201, 0.8);
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                padding: 5px;
                .title{
                    margin: 0;
                    font-weight: 500;
                }
                .input{
                    display: flex;
                    input{
                        text-align: center;
                        width: 45px;
                        height: 30px;
                        outline: none;
                        border: 1px solid rgb(206, 206, 206);
                        border-radius: 5px;
                        margin-right: 5px;
                    }
                    .unit{
                        width: 130px;
                        height: 32px;
                        border: 1px solid rgb(206, 206, 206);
                        border-radius: 5px;
                        background: white;
                        display: flex;
                        align-items: center;
                        .date{
                            margin-top: 11px;
                            margin-left:5px;
                            width: 100px;

                        }
                    }
                }
                button{
                    width: 90px;
                    height: 30px;
                }
                .btn{
                      button:nth-child(1){
                        background: #ffffff;
                        border:1px solid #f6f1eb;
                        box-shadow: 0 0 2px rgba(201, 201, 201, 0.8);
                        border-radius: 5px;
                        color: #5d5d5d;
                    }
                    button:nth-child(2){
                        background: #6f80ff;
                        border:1px solid #f6f1eb;
                        box-shadow: 0 0 2px rgba(201, 201, 201, 0.8);
                        border-radius: 5px;
                        color: white;
                    }
                }
            }
        .selectUnit{
            height: 160px;
            position: absolute;
            width: 140px;
            background: #ebebeb;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            border-radius: 8px;
            div{
                height: 30px;
                padding-left:10px;
                line-height: 30px;
                 border-radius: 3px;
                 &:hover{
                    background: #e0e0e0;
                 }
            }
        }
    .active{
        border-left:3px solid #6f80ff;
        background: #e0e0e0;
    }
   
</style>