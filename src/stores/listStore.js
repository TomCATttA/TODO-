import { defineStore } from "pinia"
import { generateUniqueTitle } from "@/utils/generateUniqueTitle";
import { getUniqueTitle } from "@/utils/getUniqueTitle";
import {ref} from "vue"
//列表内容
export const useListStore = defineStore('list',()=>{
    const list = ref([])
    //添加列表
    const add = ({ id, title, autoName, type = '列表', childrenlist }) => {
    if (autoName || !title) {
      const base = type === '组' ? '未命名组' : '未命名列表';
      title = generateUniqueTitle(base, list.value, type);
    }

    const newItem = { id, title, type };
    if (type === '组') {
      newItem.childrenlist = childrenlist || [];
    }

    list.value.push(newItem);
  };
    //删除
    const del = (id, elId) => {
  // 删除子项
  if (elId !== undefined) {
    const parent = list.value.find(item => item.id === elId);
    if (parent?.childrenlist) {
      parent.childrenlist = parent.childrenlist.filter(child => child.id !== id);
    }
    return;
  }
  // 删除顶级项
  const index = list.value.findIndex(item => item.id === id);
  if (index === -1) return;
  const item = list.value[index];
  const canDelete = item.type !== '组' || !item.childrenlist || item.childrenlist.length === 0;
  if (canDelete) {
    list.value.splice(index, 1);
  } else {
    // 解组：把子项提升到顶层，再删组
    list.value.push(...item.childrenlist);
    list.value.splice(index, 1);
  }
};

    //根据id获取列表(组)名
    const getTitle = (id,elId)=>{
        const target = list.value.find(item => item.id === id)
        if(!target){
            const elTarget = list.value.find(item => item.id === elId)
            const subTarget = elTarget.childrenlist.find(item => item.id === id)
            return subTarget.title
        }
        return target.title
    }
    //重命名列表
    const edit = (id, elId, newTitle) => {
  // 注意：必须先去掉自己的旧名字再去查是否重复
  // 否则改了名字，名字还是自己，但它也被认为是“重复”的
  const getFilteredList = () => {
    const clone = JSON.parse(JSON.stringify(list.value));
    const removeTitleById = (items) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          items[i].title = ""; // 清空自身旧 title
        }
        if (items[i].childrenlist) removeTitleById(items[i].childrenlist);
      }
    };
    removeTitleById(clone);
    return clone;
  };

  const filteredList = getFilteredList();
  const uniqueTitle = getUniqueTitle(newTitle.trim(), filteredList);

  if (elId !== undefined) {
    const parent = list.value.find(item => item.id === elId);
    if (!parent || !Array.isArray(parent.childrenlist)) return;

    const child = parent.childrenlist.find(child => child.id === id);
    if (child) child.title = uniqueTitle;
  } else {
    const item = list.value.find(item => item.id === id);
    if (item) item.title = uniqueTitle;
  }
};

    return{
        list,
        del,
        add,
        edit,
        getTitle,
    }
})