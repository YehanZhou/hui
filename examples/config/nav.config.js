const navs = {
  CN: [
    {
      name: '更新日志',
      path: '/changelog'
    },
    {
      name: '组件',
      groups: [
        {
          groupName: 'Basic',
          list: [
            {
              path: '/layout',
              title: 'Layout 布局'
            },
            {
              path: '/container',
              title: 'Container 布局容器'
            },
            {
              path: '/color',
              title: 'Color 色彩'
            },
            {
              path: '/typography',
              title: 'Typography 字体'
            },
            // {
            //   path: '/border',
            //   title: 'Border 边框'
            // },
            {
              path: '/icon',
              title: 'Icon 图标'
            },
            {
              path: '/button',
              title: 'Button 按钮'
            }
          ]
        },
        {
          groupName: 'Form',
          list: [
            {
              path: '/radio',
              title: 'Radio 单选框'
            },
            {
              path: '/checkbox',
              title: 'Checkbox 多选框'
            }
          ]
        }
      ]
    }
  ]
}

export default navs
