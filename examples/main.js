import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import '@examples/style/index.scss'

import wsGroceryStore from '@packages/index'
import { Button } from 'vant'
Vue.use(Button).use(wsGroceryStore)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
