import HlUI from '../packages/index'

export default async({ Vue }) => {
  if (typeof process === 'undefined') {
    Vue.use(HlUI)
  }
}
