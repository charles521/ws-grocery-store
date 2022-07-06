import WsButton from './ws-button'
import WsCard from './ws-card'

// 存储组件列表
const components = [
  WsButton,
  WsCard
]

// 定义install 方法，接受Vue作为参数。如果使用use注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  WsButton,
  WsCard
}

export default {
  install,
  ...components
}
