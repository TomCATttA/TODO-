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
import selectRepeatDay from './selectRepeatDay.vue'
dayjs.locale("zh-cn");
//提醒时间
import selectAlertDate from "./selectAlertDate.vue";
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
  const deadline = task.value.deadline;
  if (!deadline) return "添加截止日期";
  if (typeof deadline === "string" && deadline.includes("Invalid Date")) {
    return "添加截止日期";
  }
  const dateObj = dayjs(deadline);
  const currentYear = dayjs().year();
  if (!dateObj.isValid()) {
    return "添加截止日期";
  }
   if(dateObj.year() === currentYear){
    return dateObj.format("MM月DD日HH点mm分")+' 截止';
   }else{
      return dateObj.format("YYYY年MM月DD日HH点mm分")+' 截止';
   }
 
});

const useAlert = computed(() => {
  const alertTime = task.value.alertdate;
  if (!alertTime) return "提醒我";
  const dateObj = dayjs(alertTime);
  if (!dateObj.isValid()) {
    return "提醒我";
  }
  const currentYear = dayjs().year();
  if(dateObj.year() === currentYear){
    return dateObj.format("MM月DD日HH点mm分")+' 提醒我';
  }else{
    return dateObj.format("YYYY年MM月DD日HH点mm分")+' 提醒我';
  }
});

const useRepeat = computed(()=>{
  const repeatTime = task.value.repeatdate
  if(repeatTime){
    return repeatTime
  }else{
    return '重复'
  }
})

//从我的一天中移除
const delFromMyDay = (tid) => {
  taskStore.del(tid);
};

//创建时间
const createTime = computed(()=>{
  console.log('时间',task.value.date)
  const date = task.value.date
  const dateObj = dayjs(date);
  return dateObj.format("M月D日")
})

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
      <span v-else> 添加到"我的一天" </span>
    </div>
    <div class="dateScope">
      <div class="alert">
        <div style="margin-left: 7px">
          <selectAlertDate
            :positionX="positionX"
            :positionY="positionY"
            :tid="task.tid"
          ></selectAlertDate>
        </div>
        <span
          style="margin-left: 7px"
          :class="{ active1: useAlert !== '提醒我' }"
          >{{ useAlert }}</span
        >
      </div>
      <div class="todate">
        <div>
          <selectDeadLine
            :positionX="positionX"
            :positionY="positionY"
            :tid="task.tid"
          >
          </selectDeadLine>
        </div>
        <span :class="{ active2: useDeadLine !== '添加截止日期' }"
          >{{ useDeadLine }}
        </span>
      </div>
      <div class="repeat">
        <div>
          <selectRepeatDay
           positionX="-130pX"
            :positionY="positionY"
            :tid="task.tid"
          >
          </selectRepeatDay>
        </div>
        <span class="subrepeat"
        
        :class="{ active1: useRepeat !== '重复' }"
        >{{useRepeat}}</span>
      </div>
    </div>
    <div class="delete">
      <div class="createDate">创建于{{createTime}}</div>
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
    .repeat,
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
      .subrepeat{
        margin-left: 7px;
      }
    }
  }
  .delete {
    height: 40px;
    width: 250px;
    margin: 0 auto;
    display: flex;
    // flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgb(211, 211, 211);
    .createDate{
      font-size: 15px;
      color: #a4a4a4;
    }
  }
}
.active1 {
  color: rgb(50, 142, 255);
}
.active2 {
  color: rgb(251, 114, 114);
}
.deadline {
  background: #f6f1eb;
}
</style>