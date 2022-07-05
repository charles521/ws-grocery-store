import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'vant/lib/index.css'
import '../examples/style/index.scss'

Vue.config.productionTip = false

import hlButton from './../packages/index'

Vue.use(hlButton)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
