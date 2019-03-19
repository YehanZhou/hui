import HRow from './components/row.js'
import HCol from './components/col.js'
import HButton from './components/button.vue'

const components = [
  HRow,
  HCol,
  HButton
]

export default function (Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};
