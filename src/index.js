import HRow from './components/row/index.js'
import HCol from './components/col/index.js'
import HContainer from './components/container/index.js'
import HMain from './components/main/index.js'
import HAside from './components/aside/index.js'
import HHeader from './components/header/index.js'
import HFooter from './components/footer/index.js'
import HIcon from './components/icon/index.js'
import HButton from './components/button/index.js'
import HButtonGroup from './components/button-group/index.js'
import HRadio from './components/radio/index.js'
import HRadioButton from './components/radio-button/index.js'
import HRadioGroup from './components/radio-group/index.js'
import HCheckbox from './components/checkbox/index.js'
import HCheckboxButton from './components/checkbox-button/index.js'
import HCheckboxGroup from './components/checkbox-group/index.js'

const components = [
  HRow,
  HCol,
  HContainer,
  HMain,
  HAside,
  HHeader,
  HFooter,
  HIcon,
  HButton,
  HButtonGroup,
  HRadio,
  HRadioButton,
  HRadioGroup,
  HCheckbox,
  HCheckboxButton,
  HCheckboxGroup
]

export default function(Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}
