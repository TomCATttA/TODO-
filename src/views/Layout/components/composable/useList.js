//封装左侧导航列表数据的相关业务代码
import { ref, nextTick, reactive } from "vue";
import { useListStore } from "@/stores/listStore";

export function useList() {
    const listStore = useListStore();
    const listName = ref("");
    const inputRef1 = ref(null);
    const isShowAddList = ref(false);
    let listIndex = 1;
    const openList = () => {
        isShowAddList.value = true;
        listName.value = '';
        nextTick(() => {
            inputRef1.value?.focus();
        });
    };
    //添加列表
    const addList = () => {
        const newItem = {
            id: Date.now(), // 使用时间戳作为唯一ID
            title: listName.value || `未命名的列(${listIndex++})`,
            type: "列表"
        };
        listStore.add(newItem);
        isShowAddList.value = false;
    };

    return {
        listName,
        inputRef1,
        isShowAddList,
        openList,
        addList,
    };
}