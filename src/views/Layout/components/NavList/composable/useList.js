//封装左侧导航列表数据的相关业务代码
import { ref, nextTick} from "vue";
import { useListStore } from "@/stores/listStore";
import { getUniqueTitle } from "@/utils/getUniqueTitle";
export function useList() {
    const listStore = useListStore();
    const listName = ref("");
    const inputRef1 = ref(null);
    const isShowAddList = ref(false);
    const openList = () => {
        isShowAddList.value = true;
        listName.value = '';
        nextTick(() => {
            inputRef1.value?.focus();
        });
    };
    //添加列表
  const addList = () => {
  let newItem;
    const uniqueTitle = getUniqueTitle(listName.value, listStore.list);
  if (uniqueTitle) {
    newItem = {
      id: Date.now(),
      title: uniqueTitle,
      type: "列表"
    };
  } else {
    newItem = {
      id: Date.now(),
      autoName: true,
      type: "列表"
    };
  }
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