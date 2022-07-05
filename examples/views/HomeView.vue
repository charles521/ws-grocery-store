<template>
  <div class="home">
    <ws-button @wsClick="showPopup" />
    <ws-calendar v-if="calendarShow" @close="calendarClose" />
  </div>
</template>

<script>
import { WsCalendar } from '@packages/index'
export default {
  name: 'HomeView',
  components: {
    WsCalendar
  },
  data() {
    return {
      calendarShow: false
    }
  },
  methods: {
    showPopup() {
      this.calendarShow = true
    },
    calendarClose() {
      this.calendarShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
}
</style>
