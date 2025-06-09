<script setup>
import {ref,nextTick ,computed} from 'vue'
import { useListStore } from "@/stores/listStore";
import { ElMessage, ElMessageBox } from 'element-plus'

const isEdit = ref(false)
const changeName = ref("");
const rename = ref("");
const listStore = useListStore();

const props = defineProps({
    id:Number,
    title:String,
    elId:Number
})
//删除 提示框
const listName = ref()
const delList = (id,elId,title) => {
  console.log("子id:",elId)
    listName.value = title
  ElMessageBox.confirm(
    `确定要删除 "${listName.value}" 吗?`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      listStore.del(id,elId)
    })
    .catch(() => {
    })
}

//重命名
const openEdit = (id,elId) => {
  isEdit.value = id;
  changeName.value = listStore.getTitle(id,elId);
  nextTick(() => {
    const inputEl = document.querySelector(`[data-ref="rename-${id}"]`);
    if (inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  });
};
const updateName = (id,elId) => {
  if (changeName.value.trim()) {
    // 检查是否有输入内容
    listStore.edit(id,elId,changeName.value);
  }
  isEdit.value = ""; // 重置编辑状态
  changeName.value = ""; // 清空输入
};

// 根据字数计算字体大小，限制最小最大
const fontSize = computed(() => {
  const len = props.title.length
  if (len <= 5) return '18px'
  if (len <= 10) return '14px'
  return '12px'
})

</script>
<template>
  <div class="list">
    <div v-if="!isEdit" class="info">
      <i class="iconfont icon-liebiao-zu"></i>
      <p :style="{ fontSize: fontSize }">{{ title }}</p>
      <i class="iconfont icon-zhongmingming" @click.stop="openEdit(id,elId)"></i>
      <i class="iconfont icon-quxiao" @click.stop="delList(id,elId,title)"></i>
    </div>
    <div v-else class="infoInput">
      <i class="iconfont icon-liebiao-zu"></i>
      <input type="text" :data-ref="`rename-${id}`" v-model="changeName" @blur="updateName(id,elId)">
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

        .info{
            display: flex;
            align-items: center;
            padding: 3px;
                       p {
  width: 110px;
  margin-top: 0;
  white-space: nowrap;
  overflow: hidden;       /* 超出隐藏 */
  text-overflow: ellipsis; /* 用省略号替代 */
}
            .iconfont{
                margin-right: 8px;
                font-size: 17px;
                margin-top: -13px;
            }
            .icon-zhongmingming,.icon-quxiao{
              position: absolute;
              right: 25px; // 根据需要调整
              top: 25px;
                transition: 0.3s;
                display: none;
                &:hover{
                    color: rgb(103, 103, 103);
                    cursor: pointer;
                }
            }
               .icon-quxiao{
              position: absolute;
              right: 0px; // 根据需要调整
              top: 25px;
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
            input {
      width: 100px;
      padding: 4px 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }
    input:focus {
      outline: none;
      border-color:#3d5ddb;
      
    }
            .iconfont{
                margin-right: 8px;
                margin-left: 5px;
                font-size: 17px;
                margin-top: 2px;
            }
        }
    }
            .isActive{
      background: #e3e3e3;
    }
</style>