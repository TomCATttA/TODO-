
<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

const show = ref(false)
const panelRef = ref(null)
onClickOutside(panelRef, () => (show.value = false))

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth())
const selectedDay = ref(today.getDate())

const selectedHour = ref(today.getHours())
const selectedMinute = ref(today.getMinutes())

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const daysInMonth = computed(() => new Date(year.value, month.value + 1, 0).getDate())
const startWeek = computed(() => new Date(year.value, month.value, 1).getDay())

const toggle = () => (show.value = !show.value)

const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11
    year.value--
  } else {
    month.value--
  }
}
const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0
    year.value++
  } else {
    month.value++
  }
}

const selectDate = (day) => {
  selectedDay.value = day
}

const isSelectedDate = (d) => selectedDay.value === d && year.value === today.getFullYear() && month.value === today.getMonth()
const isToday = (d) => {
  const now = new Date()
  return (
    d === now.getDate() &&
    month.value === now.getMonth() &&
    year.value === now.getFullYear()
  )
}

const displayValue = computed(() => {
  if (!selectedDay.value) return ''
  return `${String(month.value + 1).padStart(2, '0')}月${String(selectedDay.value).padStart(2, '0')}日 ${String(selectedHour.value).padStart(2, '0')}:${String(selectedMinute.value).padStart(2, '0')}`
})

//将选择的时间传给父组件
const emit = defineEmits(['get-alert-time'])
const confirm = () => {
const selected = new Date(year.value, month.value, selectedDay.value,selectedHour.value,selectedMinute.value)
const date = dayjs(selected).tz("Asia/Shanghai")
  // const isoDate = date.format()
  emit('get-alert-time',displayValue.value,date)
  show.value = false
}


</script>

<template>
  <div class="datetime-picker">
    <div class="selectTime"><i class="iconfont icon-dingshirenwurizhichaxun" @click="toggle"></i><span class="select">选择日期和时间</span></div>
    <div v-if="show" class="panel" ref="panelRef">
      <!-- 日期选择 -->
      <div class="calendar">
        <div class="calendar-header">
          <button @click="prevMonth">←</button>
          <span>{{ year }}年{{ month + 1 }}月</span>
          <button @click="nextMonth">→</button>
        </div>
        <div class="weekdays">
          <span v-for="w in weekdays" :key="w">{{ w }}</span>
        </div>
        <div class="days">
          <span v-for="b in startWeek" :key="'b' + b" class="blank"></span>
          <span
            v-for="d in daysInMonth"
            :key="d"
            :class="{ selected: isSelectedDate(d), today: isToday(d) }"
            @click="selectDate(d)"
          >
            {{ d }}
          </span>
        </div>
      </div>

      <!-- 时间选择 -->
      <div class="time">
        <label>时间：</label>
        <select v-model="selectedHour" @click.stop>
          <option v-for="h in 24" :key="h" :value="h - 1">{{ (h - 1).toString().padStart(2, '0') }}</option>
        </select>
        :
        <select v-model="selectedMinute" @click.stop>
          <option v-for="m in 60" :key="m" :value="m - 1">{{ (m - 1).toString().padStart(2, '0') }}</option>
        </select>
      </div>

      <!-- 确认 -->
      <div class="footer">
        <button @click="confirm">确认</button>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.datetime-picker {
  position: relative;
  display: inline-block;
}

.panel {
  position: absolute;
  bottom: -45px;
  left: -20px;
  background: white;
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  width: 260px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 8px;
}

.weekdays, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 4px;
}

.days span {
  padding: 6px 0;
  cursor: pointer;
  border-radius: 4px;
  margin: 2px;
}

.days .blank {
  background: transparent;
}

.days span:hover {
  background: #eee;
}

.days .today {
  border: 1px solid #007bff;
}

.days .selected {
  background: #007bff;
  color: white;
}

.time {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.footer {
  margin-top: 10px;
  text-align: right;
}
.selectTime{
    display: flex;
    align-items: center;
    .iconfont{
        margin-left: -10px;
    }
    .select{
        margin-left: 10px;
        width: 200px;
    }
}
</style>
