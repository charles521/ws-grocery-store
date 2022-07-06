import WsCard from './src/ws-card.vue'

WsCard.install = function(Vue) {
  Vue.component(WsCard.name, WsCard)
}

export default WsCard
