import HlArea from './hl-area'
import HlMap from './hl-map'
import HlSign from './hl-sign'

// 存储组件列表
const components = [
  HlArea,
  HlMap,
  HlSign
]

// 定义install 方法，接受Vue作为参数。如果使用use注册插件，则所有的组件都将被注册
const install = Vue => {
  if (install.installed) return
  components.forEach(Component => {
    Vue.component(Component.name, Component)
  })
}

//  如果浏览器环境且拥有全局Vue，则自动安装组件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}

