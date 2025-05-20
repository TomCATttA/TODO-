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
    //取消组
const del = (id) => {
    console.log('删除操作', id);
    
    // 找到要删除的项的索引
    const index = list.value.findIndex(item => item.id === id);
    
    // 如果没找到直接返回
    if (index === -1) return;
    
    const item = list.value[index];
    
    // 如果是组且没有子项，或者不是组类型，则删除
    if ((item.type === '组' && (!item.childrenlist || item.childrenlist.length === 0)) || 
        item.type !== '组') {
        list.value.splice(index, 1);
    } else {
        list.value.push(...item.childrenlist)
        list.value.splice(index, 1);
        console.warn('该组不为空，无法删除');
    }
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
        getTitle,
    }
})