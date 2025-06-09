<script setup>
import { ref, nextTick, reactive, onMounted, onBeforeMount } from "vue";
import { useListStore } from "@/stores/listStore";
import { VueDraggable } from "vue-draggable-plus";
import {useUserStore} from "@/stores/userStore"
import {useRoute} from 'vue-router'
const route = useRoute()
//导入列表业务
import { useList } from "./composable/useList";
// 使用列表相关的 composable
const { listName, inputRef1, isShowAddList, openList, addList, delList } = useList();
//导入组业务
import { useGroup } from "./composable/useGroup";
//导入组件
import MyGroup from "./components/MyGroup.vue";
import MyList from "./components/MyList.vue";
import { useRouter } from "vue-router";
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
const userStore = useUserStore()
const search = ref("");
const isDragging = ref(false);
const isDropping = ref(false);
const router = useRouter()
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
//登录情况验证
const isSelect = ref(1)
onBeforeMount(()=>{
  if(route.params.id){
    isSelect.value = 0
  }
  //token不存在则跳到登录页面
  if(!userStore.userInfo.token){
    router.replace('/login')
  }
})
//退出登录
//确定退出登录
const confirmEvent = () => {
   userStore.userInfo = ''
   router.replace('/login')
}

const select = (num)=>{
    switch(num){
      case num:
        isSelect.value =num
        break
    }
}
</script>
<template>
  <div class="nav">
    <div class="nav-top">
      <ul>
        <li>
          <el-popconfirm
    confirm-button-text="确定"
    cancel-button-text="取消"
    :icon="InfoFilled"
    icon-color="#626AEF"
    title="你确定要退出登录吗?"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <template #reference>
      <div class="user">
      <div class="img">
            <el-avatar
              shape="square"
              :size="60"
              fit="fill"
              :src="userStore.userInfo.imgUrl"
            />
          </div>
          <div class="useinfo">
            <p class="usename">{{userStore.userInfo.username}}</p>
            <p class="email">{{userStore.userInfo.email}}</p>
          </div>
          </div>
    </template>
  </el-popconfirm>
         
        </li>
        <li>
          <el-input v-model="search" style="width: 190px" placeholder="搜索...">
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
        </li>
        <li @click="select(1)" :class="{active:isSelect === 1}"><router-link to='/' class="router-link-style"><i class="iconfont icon-taiyang"></i>我的一天</router-link></li>
        <li @click="select(2)" :class="{active:isSelect === 2}"><i class="iconfont icon-shoucang"></i>重要</li>
        <li @click="select(3)" :class="{active:isSelect === 3}"><i class="iconfont icon-jihua"></i>计划内</li>
        <li @click="select(4)" :class="{active:isSelect === 4}"><i class="iconfont icon-yifenpei"></i>已分配给我</li>
        <li @click="select(5)" :class="{active:isSelect === 5}"><i class="iconfont icon-home"></i>任务</li>
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
            <router-link :to="`/list/000/${element.id}`" class="router-link-style">
              <MyList
                :id="element.id"
                :title="element.title"
                :type="element.type"
                v-if="element.type === '列表'"
                :class="{active:isSelect === element.id}"
                @click="select(element.id)"
              />
            </router-link>
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
 <router-link :to="`/list/${element.id}/${subElement.id}`"  class="router-link-style">
                <MyList
                  :id="subElement.id"
                  :title="subElement.title"
                  :type="subElement.type"
                  :el-id="element.id"
                  class="subTitem"
                  @click="select(subElement.id)"
                  :class="{active:isSelect === subElement.id}"
                  v-show="activeGroupId === element.id"
                />
</router-link>
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
  background: #efeeec;
  border-radius: 5px;
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
         background: #efeeec;
        border-radius: 5px;
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
         background: #efeeec;
            border-radius: 5px;
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
        .user{
          display: flex;
        }
        // .el-tooltip__trigger{
        //   width: 60px;
        // }
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
.router-link-style {
  display: block;
  text-decoration: none;
  color: inherit;
}
.active{
  background: #e3e3e3;
}
</style>