import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let defaultPath = '/layout';

export default new Router({
  routes: [{
      path: '/',
      redirect: defaultPath
    },
    {
      path: '/layout',
      name: 'layout',
      component: r => require.ensure([], () => r(require('../docs/layout.md')))
    },
    {
      path: '/icon',
      name: 'icon',
      component: r => require.ensure([], () => r(require('../docs/icon.md')))
    },
    {
      path: '/button',
      name: 'button',
      component: r => require.ensure([], () => r(require('../docs/button.md')))
    },
    {
      path: '*',
      redirect: defaultPath
    }
  ]
})
