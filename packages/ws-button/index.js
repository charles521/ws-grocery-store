import WsButton from './src/ws-button.vue'

WsButton.install = function(Vue) {
  Vue.component(WsButton.name, WsButton)
}

export default WsButton
