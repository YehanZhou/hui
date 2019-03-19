// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import hljs from 'highlight.js'
import DemoBlock from './components/demo-block.vue'
import '../src/theme/index.scss'
import install from '../src/index'

install(Vue)

Vue.config.productionTip = false
Vue.component("demo-block", DemoBlock);

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  })
  // const data = title[route.meta.lang];
  // for (let val in data) {
  //   if (new RegExp('^' + val, 'g').test(route.name)) {
  //     document.title = data[val];
  //     return;
  //   }
  // }
  // document.title = 'Element';
})

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
