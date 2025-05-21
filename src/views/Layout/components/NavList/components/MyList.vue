<script setup>
import {ref,nextTick } from 'vue'
import { useListStore } from "@/stores/listStore";

const isEdit = ref(false)
const changeName = ref("");
const rename = ref("");
const listStore = useListStore();

const props = defineProps({
    id:Number,
    title:String,
})

//重命名
const openEdit = (id) => {
  isEdit.value = id;
  changeName.value = listStore.getTitle(id);
  nextTick(() => {
    const inputEl = document.querySelector(`[data-ref="rename-${id}"]`);
    if (inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  });
};
const updateName = (id) => {
  if (changeName.value.trim()) {
    // 检查是否有输入内容
    listStore.edit(id, changeName.value);
  }
  isEdit.value = ""; // 重置编辑状态
  changeName.value = ""; // 清空输入
};

</script>
<template>
  <div class="list">
    <div v-if="!isEdit" class="info">
      <i class="iconfont icon-liebiao-zu"></i>
      <p>{{ title }}</p>
      <i class="iconfont icon-zhongmingming" @click="openEdit(id)"></i>
      <i class="iconfont icon-quxiao" @click="listStore.del(id)"></i>
    </div>
    <div v-else class="infoInput">
      <i class="iconfont icon-liebiao-zu"></i>
      <input type="text" :data-ref="`rename-${id}`" v-model="changeName" @blur="updateName(id)">
    </div>
  </div>
</template>

<style scoped lang="scss">
 .list{
        padding: 5px;
        margin: 5px;
        margin-bottom: 10px;
        height: 30px;
        font-size: 15px;
        position: relative;
        border-radius: 5px;
        background: rgb(255, 255, 255);
        .info{
            display: flex;
            align-items: center;
            padding: 3px;
            p{
                width: 110px;
                margin-top: 0;
            }
            .iconfont{
                margin-right: 8px;
                font-size: 17px;
                margin-top: -13px;
            }
            .icon-zhongmingming,.icon-quxiao{
                transition: 0.3s;
                display: none;
                &:hover{
                    color: rgb(103, 103, 103);
                    cursor: pointer;
                }
            }
            &:hover{
                .icon-zhongmingming,.icon-quxiao{
                display: block;
            }
            }
        }
        .infoInput{
            position: absolute;
            padding: 3px;
            left: 0;
            input{
                width: 120px;
            }
            .iconfont{
                margin-right: 8px;
                margin-left: 5px;
                font-size: 17px;
                margin-top: 2px;
            }
        }
    }
</style>