import HRow from './components/row/index.js'
import HCol from './components/col/index.js'
import HIcon from './components/icon/index.js'
import HButton from './components/button/index.js'
import HButtonGroup from './components/button-group/index.js'

const components = [HRow, HCol, HIcon, HButton, HButtonGroup]

export default function(Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}
