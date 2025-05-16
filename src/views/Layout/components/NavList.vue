<script setup>
import { ref, nextTick } from "vue";
import { useListStore } from "@/stores/listStore";
//导入列表业务
import { useList } from "./composable/useList";
// 使用列表相关的 composable
const { listName, inputRef1, isShowAddList, openList, addList,delList} = useList();
//导入组业务
import { useGroup } from "./composable/useGroup";
// 使用组相关的 composable
const { groupName, inputRef2, isShowAddGroup, openGroup, addGroup} = useGroup();
const listStore = useListStore();
const search = ref("");
const isEdit = ref(null)
const changeName = ref("");
const rename = ref('')
//重命名
const openEdit = (id) => {
  isEdit.value = id
  changeName.value = listStore.getTitle(id)
  nextTick(() => {
 const inputEl = document.querySelector(`[data-ref="rename-${id}"]`);
    if (inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  })
}
const updateName = (id) => {
if (changeName.value.trim()) { // 检查是否有输入内容
    listStore.edit(id, changeName.value); 
  }
  isEdit.value = ""; // 重置编辑状态
  changeName.value = ""; // 清空输入
}
// //列表的重命名
// const reListname = (id) => {
  
// };
// //组的重命名
// const reGroupname = (id) => {
//   if (changeName.value.trim()) { // 检查是否有输入内容
//     listStore.edit(id, changeName.value); 
//   }
//   isEdit.value = ""; // 重置编辑状态
//   changeName.value = ""; // 清空输入
// };
</script>

<template>
  <div class="nav">
    <div class="nav-top">
      <ul>
        <li>
          <div class="img"></div>
          <div class="useinfo">
            <p class="usename">aizhu</p>
            <p class="email">1688888888@qq.com</p>
          </div>
        </li>
        <li>
          <el-input v-model="search" style="width: 190px" placeholder="搜索...">
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
        </li>
        <li><i class="iconfont icon-taiyang"></i>我的一天</li>
        <li><i class="iconfont icon-shoucang"></i>重要</li>
        <li><i class="iconfont icon-jihua"></i>计划内</li>
        <li><i class="iconfont icon-yifenpei"></i>已分配给我</li>
        <li><i class="iconfont icon-home"></i>任务</li>
      </ul>
    </div>
    <div class="nav-bottom">
      <ul>
        <li v-for="item in listStore.list" :key="item.id">
          <i
            :class="[
              'iconfont',
              item.type === '列表' ? 'icon-liebiao-zu' : 'icon-liebiao',
            ]"
          ></i>
          <div class="info" v-show="isEdit !== item.id">
          <p class="title">{{ item.title }}</p>
          <i class="iconfont icon-zhongmingming" @click="openEdit(item.id)"> </i>
          <i class="iconfont icon-quxiao" @click="item.type === '列表' ? delList(item.id) : cancelGroup"> </i>
          </div>
          <input
           :data-ref="'rename-' + item.id"
            v-show="isEdit === item.id"
            type="text"
            @blur="updateName(item.id)"
            v-model="changeName"
          />
        </li>
        <!-- 添加列表 -->
        <li v-show="isShowAddList">
          <i class="iconfont icon-liebiao-zu"></i
          ><input
            type="text"
            ref="inputRef1"
            @blur="addList"
            v-model="listName"
          />
        </li>
        <!-- 添加组 -->
        <li v-show="isShowAddGroup">
          <i class="iconfont icon-liebiao"></i
          ><input
            type="text"
            ref="inputRef2"
            @blur="addGroup"
            v-model="groupName"
          />
        </li>
      </ul>
      <div class="btn">
        <button class="btn1" @click="openList">
          <i class="iconfont icon-jiahao"></i><span>新建列表</span>
        </button>
        <button class="btn2" @click="openGroup">
          <i class="iconfont icon-zubie"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.nav {
  width: 210px;
  height: 100%;
  background: rgba(240, 239, 239, 0.815);
  box-shadow: 5px 0 5px -2px #e3e3e3;
  border-radius: 10px;
  position: relative;
  .nav-bottom {
    height: 330px;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        height: 40px;
        padding-left: 10px;
        display: flex;
        align-items: center;
        transition: 0.3s linear;
        position: relative;
        .info{
          width: 170px;
          display: flex;
          align-items: center;
        }
        input{
           position: absolute;
           left: 30px;
        }
        .icon-zhongmingming,
      .icon-quxiao {
        opacity: 0; // 默认隐藏
        transition: opacity 0.3s; // 添加过渡效果
        &:hover{
          color: #1f1f1f;
        }
      }
        &:hover{
          .icon-zhongmingming,
        .icon-quxiao {
          opacity: 1; // 悬停时显示
        }
           background: #e3e3e3; 
           cursor: pointer;
        }
        p{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 15px;
          width: 110px;
          color: #1f1f1f;
          padding-right: 8px;
          margin-top: 12px;
        }
        i.iconfont {
          padding-right: 10px;
          font-size: 15px;
        }
        input {
          width: 80px;
          height: 20px;
          outline: none;
          border: 1px solid #e3e3e3;
        }
        input:focus {
          border-color: #e3e3e3; /* 灰色边框 */
        }
      }
    }

    .btn {
      display: flex;
      .btn1 {
        border: 0;
        width: 170px;
        height: 40px;
        display: flex;
        align-items: center;
        transition: 0.3s;
        i.iconfont {
          margin-right: 30px;
          margin-left: 10px;
        }
        &:hover {
          background: #e3e3e3;
          cursor: pointer;
        }
      }
      .btn2 {
        width: 40px;
        height: 40px;
        border: 0;
        &:hover {
          background: #e3e3e3;
          cursor: pointer;
        }
      }
    }
    span {
      color: black;
    }
  }
  .nav-top {
    border-bottom: 2px solid #e9e6e6;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li:nth-child(1) {
        height: 70px;
        display: flex;
        padding: 15px 10px 10px 10px;
      }
      li:nth-child(n + 3):nth-child(-n + 7) {
        line-height: 45px;
        transition: 0.3s linear;
        cursor: pointer;
        &:hover {
          background: #e3e3e3;
        }
      }
      li {
        height: 45px;
        padding-left: 10px;
        font-size: 15px;
        .iconfont {
          padding-right: 10px;
          font-size: 15px;
        }
        .img {
          border-radius: 50%;
          background: rgb(0, 255, 242);
          width: 60px;
          height: 60px;
        }
        .useinfo {
          width: 125px;
          height: 70px;
          padding-top: 10px;
          margin-left: 5px;
          .usename {
            color: black;
            margin: 0;
          }
          .email {
            color: #7f7f7f;
            white-space: nowrap;
            font-size: 13px;
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>