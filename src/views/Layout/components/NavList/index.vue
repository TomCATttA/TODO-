<script setup>
import { ref, nextTick, reactive } from "vue";
import { useListStore } from "@/stores/listStore";
import { VueDraggable } from "vue-draggable-plus";

//导入列表业务
import { useList } from "./composable/useList";
// 使用列表相关的 composable
const { listName, inputRef1, isShowAddList, openList, addList, delList } =
  useList();
//导入组业务
import { useGroup } from "./composable/useGroup";
//导入组件
import MyGroup from "./components/MyGroup.vue";
import MyList from "./components/MyList.vue";
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
const isDragging = ref(false);
const isDropping = ref(false);

//拖拽
//设置group规则
const getGroupA = ref({
  name: "lists",
  pull: true,
  put: true,
});

const getGroupB = ref({
  name: "lists",
  pull: true,
  put: true,
});

const onStartDrag = (evt) => {
  if (evt.data.type === "列表") {
    isDragging.value = true;
  }
  if (evt.data.type === "组") {
    getGroupB.value.put = false;
  }
};

const onStartDrop = (evt) => {
 if (evt?.data?.type === "列表") {
    isDropping.value = true;
  }
};

const onDragEnd = (evt) => {
  console.log("拖拽结束", evt);
  isDropping.value = false;
  isDragging.value = false;
  getGroupB.value.put = true;
  nextTick(() => {
    console.log("更新后的数据：", JSON.stringify(listStore.list, null, 2));
  });
};

//展开组
const activeGroupId = ref(null)
const handleGroupFold = (clickedId, shouldExpand) => {
  activeGroupId.value = shouldExpand ? clickedId : null
}

</script>
<template>
  <div class="nav">
    <div class="nav-top">
      <ul>
        <li>
          <div class="img">
            <el-avatar
              shape="square"
              :size="60"
              fit="fill"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            />
          </div>
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
       <el-scrollbar height="300px">
      <div class="nav-bottom-info">
        <VueDraggable
          v-model="listStore.list"
          ghostClass="ghost"
          animation="1000"
          @end="onDragEnd"
          @start="onStartDrag"
          :group="getGroupA"
        >
          <div v-for="element in listStore.list" :key="element.id">
            <MyGroup
              :id="element.id"
              :title="element.title"
              :type="element.type"
              :is-active="(activeGroupId === element.id) && element.childrenlist.length !== 0" 
              v-if="element.type === '组'"
              @get-isFold="handleGroupFold"
            />
            <MyList
              :id="element.id"
              :title="element.title"
              :type="element.type"
              v-if="element.type === '列表'"
            />
            <VueDraggable
              v-model="element.childrenlist"
              v-if="element.type === '组'"
              :group="getGroupB"
              animation="1000"
              @end="onDragEnd"
              @start="onStartDrop"
            >
              <template v-if="element.childrenlist.length === 0 || !(activeGroupId === element.id)">
                <div class="empty-placeholder" v-show="isDragging">拖入组</div>
                <!-- 空状态占位 -->
              </template>
              <div
v-for="subElement in element.childrenlist"
:key="subElement.id"
>

                <MyList
                  :id="subElement.id"
                  :title="subElement.title"
                  :type="subElement.type"
                  :el-id="element.id"
                  class="subTitem"
                  v-show="activeGroupId === element.id"
                />

              </div>
            </VueDraggable>
          </div>
          <template v-if="isDropping">
            <div class="drop-placeholder">-</div>
          </template>
        </VueDraggable>
 
        <!-- 添加列表 -->
        <div v-show="isShowAddList" class="lists">
          <i class="iconfont icon-liebiao-zu"></i>
          <input
            type="text"
            ref="inputRef1"
            @blur="addList"
            v-model="listName"
          />
        </div>

        <!-- 添加组 -->
        <div v-show="isShowAddGroup" class="lists">
          <i class="iconfont icon-liebiao"></i
          ><input
            type="text"
            ref="inputRef2"
            @blur="addGroup"
            v-model="groupName"
          />
        </div>
      
      </div>
       </el-scrollbar>
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
    .nav-bottom-info {
      margin: 0;
      padding: 0;
      .subTitem {
        margin-top: -20px;
        margin: 0px 10px;
        font-size: 14px;
      }
      .drop-placeholder {
        height: 30px;
        transition: 0.3s;
        background: #e3f2fd;
        border: 2px dashed #2196f3;
        margin: 5px 10px;
        text-align: center;
        border-radius: 5px;
        color: #2196f3;
        font-weight: bold;
      }
      .empty-placeholder {
        height: 30px;
        transition: 0.3s;
        background: #e3f2fd;
        border: 2px dashed #2196f3;
        margin: 5px 10px;
        text-align: center;
        border-radius: 5px;
        color: #2196f3;
        font-weight: bold;
      }
      .lists{
        .iconfont{
          margin-left: 13px;
          margin-right: 5px;
        }
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
          width: 60px;
          height: 60px;
          margin-right: 5px;
          margin-left: 5px;
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