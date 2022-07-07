import card from './card.vue'

card.install = function(Vue) {
  Vue.component(card.name, card)
}

export default card
