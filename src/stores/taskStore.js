import { defineStore } from "pinia";
import {ref} from "vue"

export const useTaskStore = defineStore('task',()=>{

    const task = ref([])
    const searchTask = ref({})
    //添加任务
    const addTask = ({sort,tid,date,title,deadline,alertdate})=>{
        task.value.push({sort,tid,date,title,deadline,alertdate})
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