//封装左侧导航组数据的相关业务代码
import { ref, nextTick } from "vue";
import { useListStore } from "@/stores/listStore";
import { getUniqueTitle } from "@/utils/getUniqueTitle";
export function useGroup(){
     const listStore = useListStore();
    const groupName = ref("");
const inputRef2 = ref(null);
const isShowAddGroup = ref(false);
const openGroup = () => {
    groupName.value = '';
    isShowAddGroup.value = true;
    nextTick(() => {
        inputRef2.value?.focus();
    });
};

const addGroup = () => {
    let newGroup;
     const uniqueTitle = getUniqueTitle(groupName.value, listStore.list);
    if(uniqueTitle ){
    newGroup = {
        id: Date.now(),
        title: uniqueTitle ,
        type: "组",
        childrenlist: [
        ]
    };
    }else{
        newGroup = {
        id: Date.now(),
        autoName: true,
        type: "组",
        childrenlist: [
        ]
    };
    }
    
    listStore.add(newGroup);
    isShowAddGroup.value = false;
};


    return{
        groupName,
        inputRef2,
        isShowAddGroup,
        openGroup,
        addGroup,
    }
}
