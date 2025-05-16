import { defineStore } from "pinia"
import {ref} from "vue"
//列表内容
export const useListStore = defineStore('list',()=>{
    const list = ref([])
    //添加列表
   const add = ({id,title,type,childrenlist}) => {  
    if(type === '组'){
        list.value.push({id,title,type,childrenlist})  
    }else{
        list.value.push({id,title,type})  // 同上
    }
}
    //删除列表
    const del = (id) => {
        const idx = list.value.findIndex((item) => id === item.id)
        list.value.splice(idx,1)
    }
    //取消组
    const cancel = () => {
        
    }
    //根据id获取列表(组)名
    const getTitle = (id)=>{
        const target = list.value.find(item => item.id === id)
        console.log(target.title)
        return target.title
    }
    //重命名列表
    const edit = (id, newTitle) => {
        const idx = list.value.findIndex((item) => id === item.id)
        if (idx !== -1 && newTitle) { // 确保索引有效且有新标题
            list.value.splice(idx, 1, {
                ...list.value[idx],
                title: newTitle.trim() 
            })
        }
    }
    return{
        list,
        del,
        add,
        edit,
        getTitle 
    }
})