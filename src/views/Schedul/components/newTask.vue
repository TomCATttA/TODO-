<script setup>
import {useTaskStore} from '@/stores/taskStore'
import {defineProps, onMounted, watch,computed} from 'vue'
import {ref} from 'vue'
const taskStore = useTaskStore()
const drawer = ref(false)
const props = defineProps({
   sort: String,
})
const task = computed(() => taskStore.showTask(props.sort))
onMounted(()=>{
   task.value = taskStore.showTask(props.sort)
})

const emit = defineEmits(['get-drawer'])
const isdrawer = (id)=>{
  drawer.value = true
  emit('get-drawer',drawer.value,id)
}
</script>

<template>
  <div class="task" v-for="item in task" :key="item.tid" @click="isdrawer(item.tid)"> 
      <i class="iconfont icon-yuanxingweixuanzhong"></i>
      <span>{{item.title}}</span>
     <i class="iconfont icon-shoucang1"></i>
  </div>
</template>

<style scoped lang="scss">
    .task{
             height: 45px;
             border-radius: 5px;
             background: #f6f1eb;
             width: 100%;
             display: flex;
             align-items: center;
             margin-bottom: 10px;
              .iconfont{
                font-size: 20px;
                margin-left: 10px;
                margin-right: 15px;
            }
            span{
                 font-size: 16px;
                 margin-bottom: 5px;
                 display: block;
                 width: 100%;
                 cursor: default;
            }
         }
</style>