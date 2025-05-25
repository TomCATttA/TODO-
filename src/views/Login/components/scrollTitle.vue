<template>
  <div class="mask">
    <div
      class="scroll"
      :style="{
        transform: `translateY(-${currentIndex * itemHeight}px)`,
        transition: transitionEnabled ? 'transform 0.5s ease' : 'none'
      }"
    >
      <div class="item" v-for="(text, index) in loopedTexts" :key="index">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const originalTexts = [
  '欢迎来到 TODO!!',
  '请先登录吧！！',
  '开始你的任务吧！',
  '今天也要元气满满~',
]
// 拼接两份用于无缝滚动
const loopedTexts = [...originalTexts, ...originalTexts]

const currentIndex = ref(0)
const itemHeight = 50
const transitionEnabled = ref(true)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    transitionEnabled.value = true
    currentIndex.value++
    // 如果到了最后一项（原始长度 + 1）
    if (currentIndex.value >= originalTexts.length + 1) {
      // 等 transition 播放完，再瞬间跳到第1项（也就是原始的第0项）
      setTimeout(() => {
        transitionEnabled.value = false // 禁止动画
        currentIndex.value = 1 // 从第1项继续
      }, 500)
    }
  }, 2000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.mask {
   cursor: default;
  height: 50px;
  overflow: hidden;
  width: 500px;
  border-radius: 6px;
  position: relative;
  .scroll {
  /* will-change 是一个 性能优化提示属性 */
  will-change: transform;
  .item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-family: Impact;
  letter-spacing: 0.1em;
  font-size: 40px;
  font-weight: bold;
//   background: linear-gradient(to right, #e7fdff, #9bf2ff, #78ffff);
background: #002FA7;
//    background: #003153;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-repeat: no-repeat;
}
}
}

</style>
