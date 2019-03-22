import HButton from './src/button';

/* istanbul ignore next */
HButton.install = function(Vue) {
  Vue.component(HButton.name, HButton);
};

export default HButton;