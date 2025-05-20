<script setup>
import { ref, nextTick ,reactive} from "vue";
import { useListStore } from "@/stores/listStore";
import draggable from "vuedraggable";
//导入列表业务
import { useList } from "./composable/useList";
// 使用列表相关的 composable
const { listName, inputRef1, isShowAddList, openList, addList, delList } =
  useList();
//导入组业务
import { useGroup } from "./composable/useGroup";
// 使用组相关的 composable
const {
  groupName,
  inputRef2,
  isShowAddGroup,
  openGroup,
  addGroup,
  cancelGroup,
} = useGroup();
const listStore = useListStore();
const search = ref("");
const isEdit = ref(null);
const changeName = ref("");
const rename = ref("");

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
const group = ref({
  name: "groups", //分组名称groups的组之间可以相互拖拽
  pull: true, //是否允许拖出当前组
  put: true, //是否允许拖入当前组
});

const  onDragEnd = (evt)=> {
  console.log(listStore.list)
  console.log('拖拽结束', evt);
  // 这里可以添加数据处理的逻辑
}
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
              <el-icon class="el-input__icon"><search/></el-icon>
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
        <draggable
          v-model="listStore.list"
          item-key="id"
          :group="group"
          animation="1000"
          @end="onDragEnd"
        >
          <template #item="{ element }">
            <li :key="element.id">
              <div class="info" v-show="isEdit !== element.id">
                 <i
                :class="[
                  'iconfont',
                  element.type === '列表' ? 'icon-liebiao-zu' : 'icon-liebiao',
                ]"
              ></i>
                <p class="title">{{ element.title }}</p>
                <i
                  class="iconfont icon-zhongmingming"
                  @click="openEdit(element.id)"
                >
                </i>
                <i
                  class="iconfont icon-quxiao"
                  @click="
                    element.type === '列表'
                      ? listStore.del(element.id)
                      : listStore.del(element.id)
                  "
                >
                </i>
                 
              </div>
              <div class="editInput" v-show="isEdit === element.id">
                 <i
                :class="[
                  'iconfont',
                  element.type === '列表' ? 'icon-liebiao-zu' : 'icon-liebiao',
                ]"
              ></i>
              <input
                :data-ref="'rename-' + element.id"
                
                type="text"
                @blur="updateName(element.id)"
                v-model="changeName"
              />
              </div>
              <draggable
                v-if="element.type === '组'"
                v-model="element.childrenlist"
                item-key="id"
                :group="group"
                animation="1000"
                @end="onDragEnd"
                class="sortable-list"
              >

            <template #item="{element:subElement}">
    <div class="subItem" :key="subElement.id">
      <i class="iconfont icon-liebiao-zu"></i>{{subElement.title}}
    </div>
  </template>
  <!-- 添加空状态提示 -->
  <template #footer v-if="!element.childrenlist || element.childrenlist.length === 0">
    <div class="empty-group-placeholder"></div>
  </template>
              </draggable>
            </li>
          </template>
        </draggable>
        <!-- 添加列表 -->
        <li v-show="isShowAddList" class="inputInfo">
          <i class="iconfont icon-liebiao-zu"></i>
          <input
            type="text"
            ref="inputRef1"
            @blur="addList"
            v-model="listName"
          />
        </li>
        <!-- 添加组 -->
        <li v-show="isShowAddGroup"  class="inputInfo">
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
      height: 100%;

      .editInput{
        height: 40px;
      }
      li {
        display: flex; // 必须启用
      flex-direction: column; // 垂直排列
      min-height: 40px; // 最小高度保障
        padding-left: 10px;
        transition: 0.3s linear;
        position: relative;
        // 空组时的占位样式
.empty-group-placeholder {
  display: none;
  height: 20px;
  margin: 5px 0 5px 10px;
}
       .subItem {
      padding: 5px;
      background: #e0e0e0;
      margin: 5px;
    }
        .info {
          width: 200px;
          display: flex;
          align-items: center;
        }
        input {
          position: absolute;
          left: 30px;
          height: 40px;
          top: 10px;
        }
        .icon-zhongmingming,
        .icon-quxiao {
          opacity: 0; 
          transition: opacity 0.3s; 
          &:hover {
            color: #1f1f1f;
          }

        }
        &:hover {
          .icon-zhongmingming,
          .icon-quxiao {
            opacity: 1; 
          }
          .empty-group-placeholder {
  display:block;
  height: 20px;
  margin: 5px 0 5px 10px;
}

        }
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 15px;
          width: 120px;
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