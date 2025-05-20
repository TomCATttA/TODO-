//封装左侧导航组数据的相关业务代码
import { ref, nextTick, reactive } from "vue";
import { useListStore } from "@/stores/listStore";
export function useGroup(){
     const listStore = useListStore();
    const groupName = ref("");
const inputRef2 = ref(null);
const isShowAddGroup = ref(false);
let groupIndex = 1;
const openGroup = () => {
    groupName.value = '';
    isShowAddGroup.value = true;
    nextTick(() => {
        inputRef2.value?.focus();
    });
};

const addGroup = () => {
    const newGroup = {
        id: Date.now(),
        title: groupName.value || `未命名的组(${groupIndex++})`,
        type: "组",
        childrenlist: [
        ]
    };
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
