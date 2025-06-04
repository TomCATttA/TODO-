<script setup>
import {
  ref,
  defineProps,
  onMounted,
  onBeforeMount,
  watch,
  computed,
} from "vue";
import { useTaskStore } from "@/stores/taskStore";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
//选择截止时间
import selectDeadLine from "./selectDeadLine.vue";
//选取截止时间菜单
const positionX = -150 + "px";
const positionY = 40 + "px";

const taskStore = useTaskStore();
const drawer = ref(false);
const task = ref({});
const props = defineProps({
  tid: Number,
});

const emit = defineEmits(["get-drawer"]);

const isdrawer = () => {
  drawer.value = false;
  emit("get-drawer", drawer.value);
};

watch(
  () => props.tid,
  (newTid) => {
    task.value = taskStore.getTaskByTid(newTid);
  },
  { immediate: true }
);

onMounted(() => {
  task.value = taskStore.getTaskByTid(props.tid);
});

//删除任务
const open = (id) => {
  ElMessageBox.confirm("确定要删除吗？", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    drawer.value = false;
    emit("get-drawer", drawer.value);
    taskStore.del(id);
  });
};

const useDeadLine = computed(() => {
  console.log("截止日期", task.value.deadline);
  if (task.value.deadline && task.value.deadline !== 'Invalid Date') {
    const date = dayjs(task.value.deadline);
    return date.format("YYYY年MM月DD日HH点mm分");
  } else {
    return "添加截止日期";
  }
});

//从我的一天中移除
const delFromMyDay = (tid) => {
  taskStore.del(tid)
}
</script>
<template>
  <div class="drawer">
    <div class="close">
      <i class="iconfont icon-htmal5icon21" @click="isdrawer"></i>
    </div>
    <div class="task">
      <i class="iconfont icon-yuanxingweixuanzhong"></i>
      <input type="text" v-model="task.title" @blur="edit(task.tid)" />
      <i class="iconfont icon-shoucang1"></i>
    </div>
    <div class="addMyday">
      <i class="iconfont icon-taiyang"></i>
      <span
        v-if="taskStore.getTaskByTid(task.tid).sort === 'myday'"
        :style="{ color: 'rgb(50, 142, 255)' }"
      >
        已添加到"我的一天"
        <el-tooltip
          class="box-item"
          effect="light"
          content="从我的一天中移除"
          placement="top-end"
        >
          <i class="iconfont icon-quxiao" @click="delFromMyDay(task.tid)"> </i>
        </el-tooltip>
      </span>
      <span v-else>
        添加到"我的一天"
      </span>
    </div>
    <div class="dateScope">
      <div class="alert">
        <i class="iconfont icon-naozhong"></i><span>提醒我</span>
      </div>
      <div class="todate">
        <div>
          <selectDeadLine
            @getDeadLine="getDeadLine"
            :positionX="positionX"
            :positionY="positionY"
            :tid="task.tid"
          >
          </selectDeadLine>
        </div>
        <span :class="{ active: useDeadLine !== '添加截止日期' }"
          >{{ useDeadLine}}
        </span>
      </div>
      <div class="repeat">
        <i class="iconfont icon-24gl-repeatDot"></i><span>重复</span>
      </div>
    </div>
    <div class="delete">
      <div class="createDate"></div>
      <div><i class="iconfont icon-shanchu" @click="open(task.tid)"></i></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer {
  background: #efeeec;
  .close {
    height: 70px;
    display: flex;
    flex-direction: row-reverse;
    .iconfont {
      margin-top: 20px;
      margin-right: 20px;
    }
  }
  .task {
    height: 40px;
    width: 280px;
    margin: 0 auto;
    border-radius: 2px;
    border: 1px solid rgb(211, 211, 211);
    margin-bottom: 30px;
    background: white;
    align-items: center;
    justify-content: space-around;
    display: flex;
    .icon-yuanxingweixuanzhong {
      font-size: 25px;
    }
    .icon-shoucang1 {
      font-size: 15px;
    }
    input {
      outline: none;
      border: none;
      width: 180px;
      height: 20px;
      font-size: 20px;
    }
  }
  .addMyday {
    height: 40px;
    width: 280px;
    margin: 0 auto;
    border-radius: 2px;
    border: 1px solid rgb(211, 211, 211);
    margin-bottom: 30px;
    background: white;
    display: flex;
    align-items: center;
    font-size: 15px;
    cursor: default;
    color: #a4a4a4;
    .iconfont {
      margin-right: 10px;
      margin-left: 15px;
    }
    &:hover {
      background: rgb(253, 248, 248);
    }
    .icon-quxiao {
      margin-left: 75px;
    }
  }
  .dateScope {
    border: 1px solid rgb(211, 211, 211);
    border-radius: 2px;
    width: 280px;
    background: white;
    margin: 0 auto;
    margin-bottom: 300px;
    div {
      height: 40px;
      margin: 0 auto;
    }
    .alert,
    .todate {
      cursor: default;
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #a4a4a4;
      // width: 250px;
      border-bottom: 1px solid rgb(211, 211, 211);
      div {
        margin-left: 5px;
        margin-right: -7px;
        display: flex;
        align-items: center;
      }
      .iconfont {
        margin-right: 10px;
        margin-left: 15px;
      }
      &:hover {
        background: rgb(253, 248, 248);
      }
      span {
        margin-left: 15px;
      }
    }
    .repeat {
      display: flex;
      align-items: center;
      cursor: default;
      font-size: 15px;
      color: #a4a4a4;
      .iconfont {
        margin-right: 10px;
        margin-left: 15px;
      }
      &:hover {
        background: rgb(253, 248, 248);
      }
    }
  }
  .delete {
    height: 40px;
    width: 250px;
    margin: 0 auto;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    border-top: 1px solid rgb(211, 211, 211);
  }
}
.active {
  color: rgb(50, 142, 255);
}
.deadline {
  background: #f6f1eb;
}
</style>