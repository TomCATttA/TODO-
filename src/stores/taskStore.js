import { defineStore } from "pinia";
import {ref} from "vue"
import dayjs from "dayjs";
export const useTaskStore = defineStore('task',()=>{
    const task = ref([])
    const searchTask = ref({})
    //添加任务
const addTask = (taskData) => {
  // 解构参数，使用不同的变量名避免冲突
  let { sort, tid, date, title, alertdate, repeatdate } = taskData;
  let deadline = taskData.deadline; 
  const dateObj = dayjs(deadline);
  if (!dateObj.isValid() && repeatdate) {
    deadline = dayjs().startOf("day").add(1, "day").toISOString();
  }
  else if (!dateObj.isValid()) {
    deadline = null;
  }
  else if (dateObj.isValid()) {
    deadline = dateObj.toISOString();
  }
  task.value.push({
    sort,
    tid,
    date,
    title,
    deadline,
    alertdate,
    repeatdate
  });
  
}

    //删除任务
    const del = (tid)=>{
       const idx = task.value.findIndex(t => t.tid === tid)
       task.value.splice(idx,1)
    }
    
    //查询任务(根据分类)
    const showTask = (sort)=>{
       return task.value.filter(t => t.sort === sort) 
    }

    //查询小任务(根据tid)
    const getTaskByTid = (tid)=>{
       return task.value.find(t => t.tid === tid) 
    }

    return{
        task,
        searchTask,
        addTask,
        del,
        showTask,
        getTaskByTid,
    }
},
  {
    persist: true,
  })