import HRow from './components/row.js'
import HCol from './components/col.js'
import HButton from './components/button.vue'
import HButtonGroup from './components/button-group.vue'

const components = [
  HRow,
  HCol,
  HButton,
  HButtonGroup
]

export default function (Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};
