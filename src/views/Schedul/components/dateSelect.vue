<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

// 当前时间数据
const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth())
const day = ref(today.getDate())

const selectedDate = ref('')
const showPicker = ref(false)
const pickerRef = ref(null)

const emit = defineEmits(['get-date'])

onClickOutside(pickerRef, () => {
  showPicker.value = false
})

const togglePicker = () => {
  showPicker.value = !showPicker.value
}

// 获取当月天数
const daysInMonth = computed(() => {
  return new Date(year.value, month.value + 1, 0).getDate()
})

// 当月第一天是星期几
const startWeek = computed(() => {
  return new Date(year.value, month.value, 1).getDay()
})

// 星期标题
const weekdays = ['日', '一', '二', '三', '四', '五', '六']

// 切换月份
const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11
    year.value -= 1
  } else {
    month.value -= 1
  }
}

const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0
    year.value += 1
  } else {
    month.value += 1
  }
}

// 点击选择日期
const selectDate = (d) => {
  const selected = new Date(year.value, month.value, d)
  const weekday = weekdays[selected.getDay()]
  selectedDate.value = `${String(month.value + 1).padStart(2, '0')}月${String(d).padStart(2, '0')}日 星期${weekday}`

  const date = dayjs(selected).tz("Asia/Shanghai")
  const isoDate = date.format()

   emit('get-date',selectedDate.value,isoDate)
  showPicker.value = false
}


// 判断是否是今天
const isToday = (d) => {
  const now = new Date()
  return (
    d === now.getDate() &&
    month.value === now.getMonth() &&
    year.value === now.getFullYear()
  )
}

// 判断是否被选中
const isSelected = (d) => {
  const dateStr = `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  return selectedDate.value === dateStr
}

</script>
<template>
  <div class="date-picker">
    <div @click="togglePicker" class="dateSelect"><i class="iconfont icon-24gl-calendar"></i><p>选择日期</p></div>
    <div v-if="showPicker" class="calendar" ref="pickerRef">
      <div class="calendar-header">
        <button @click="prevMonth">←</button>
        <span>{{ year }}年{{ month + 1 }}月</span>
        <button @click="nextMonth">→</button>
      </div>

      <div class="calendar-body">
        <div class="weekdays">
          <span v-for="w in weekdays" :key="w">{{ w }}</span>
        </div>
        <div class="days">
          <span v-for="blank in startWeek" :key="'b' + blank" class="blank"></span>
          <span
            v-for="day in daysInMonth"
            :key="day"
            :class="{ selected: isSelected(day), today: isToday(day) }"
            @click="selectDate(day)"
          >
            {{ day }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.date-picker {
  position: relative;
  display: inline-block;
  .dateSelect{
    display: flex;
    align-items: center;
    .iconfont{
      margin-right: 10px;
    }
  }
  p{
    display: block;
    height: 50px;
    width: 100px;
    line-height: 50px;
  }
  .calendar {
  position: absolute;
  bottom: -50px;
  right: 5px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  width: 230px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 10;
}

}


.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.weekdays, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.weekdays {
  font-weight: bold;
  color: #666;
  margin-bottom: 5px;
}

.days span {
  padding: 6px 0;
  cursor: pointer;
  border-radius: 4px;
  margin: 2px;
}

.days .blank {
  background: transparent;
  cursor: default;
}

.days span:hover {
  background-color: #eee;
}

.days span.today {
  border: 1px solid #007bff;
}

.days span.selected {
  background-color: #007bff;
  color: white;
}
</style>
