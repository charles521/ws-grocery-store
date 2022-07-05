import WsCalendar from './src/ws-calendar.vue'

WsCalendar.install = function(Vue) {
  Vue.component(WsCalendar.name, WsCalendar)
}

export default WsCalendar
