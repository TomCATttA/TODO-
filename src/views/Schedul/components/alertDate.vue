<script setup>

</script>

<template>
<div class="alertDate">
     <div class="selectAlert" v-show="isSelect === 2" ref="alertRef"  :style="{right:right}">
            <div><div><i class="iconfont icon-daichuli"></i>今日晚些时候</div><span>12:00</span></div>
            <div><div><i class="iconfont icon-mingtian1"></i>明天</div><span>12:00,周五</span></div>
            <div><div><i class="iconfont icon-xiazhou1"></i>下周</div><span>12:00,周一</span></div>
            <div><div style="width:150px;"><i class="iconfont icon-dingshirenwurizhichaxun"></i><span class="select">选择日期和时间</span></div></div>
            <div><div style="color:red"><i class="iconfont icon-a-shanchu1"></i>删除提醒</div></div>
        </div>
        <el-tooltip
                content="提醒我"
                placement="top"
                 effect="light"
            >
           <div> <i class="iconfont icon-naozhong" @click="toggleSelect(2)"></i><span></span></div>
             </el-tooltip>
</div>
</template>

<style lang="scss" scoped>

</style>