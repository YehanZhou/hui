import HButton from './components/button.vue'

const components = [
  HButton
]

export default function (Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};
