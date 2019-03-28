import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let defaultPath = '/layout'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: defaultPath
    },
    {
      path: '/layout',
      name: 'layout',
      component: r => require.ensure([], () => r(require('./docs/layout.md')))
    },
    {
      path: '/container',
      name: 'container',
      component: r =>
        require.ensure([], () => r(require('./docs/container.md')))
    },
    {
      path: '/color',
      name: 'color',
      component: r => require.ensure([], () => r(require('./docs/color.md')))
    },
    {
      path: '/typography',
      name: 'typography',
      component: r =>
        require.ensure([], () => r(require('./docs/typography.md')))
    },
    {
      path: '/icon',
      name: 'icon',
      component: r => require.ensure([], () => r(require('./docs/icon.md')))
    },
    {
      path: '/button',
      name: 'button',
      component: r => require.ensure([], () => r(require('./docs/button.md')))
    },
    {
      path: '/radio',
      name: 'radio',
      component: r => require.ensure([], () => r(require('./docs/radio.md')))
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: r => require.ensure([], () => r(require('./docs/checkbox.md')))
    },
    {
      path: '/input',
      name: 'input',
      component: r => require.ensure([], () => r(require('./docs/input.md')))
    },
    {
      path: '*',
      redirect: defaultPath
    }
  ]
})
