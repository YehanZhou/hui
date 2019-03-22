import HCol from './src/col'

/* istanbul ignore next */
HCol.install = function(Vue) {
  Vue.component(HCol.name, HCol)
}

export default HCol
