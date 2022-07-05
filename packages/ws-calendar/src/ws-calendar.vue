<template>
  <div class="ws-calendar">
    <van-calendar v-model="show" @close="calendarClose" />
  </div>
</template>
<script>
import { Calendar } from 'vant'

export default {
  name: 'WsCalendar',
  components: {
    [Calendar.name]: Calendar
  },
  props: {
    calendarShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    calendarClose() {
      this.$emit('close')
    }
  }
}
</script>
