'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const markdownRender = require('markdown-it')()
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const isProd = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './examples/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      hui: resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('examples'), resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // {
      //   test: /\.md$/,
      //   loader: 'vue-markdown-loader',
      //   options: {
      //     preventExtract: true,
      //     use: [
      //       [
      //         require('markdown-it-container'),
      //         'demo',
      //         {
      //           validate: function(params) {
      //             return params.trim().match(/^demo\s+(.*)$/)
      //           },

      //           render: function(tokens, idx) {
      //             const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      //             if (tokens[idx].nesting === 1) {
      //               // 1.获取第一行的内容使用markdown渲染html作为组件的描述
      //               const description = m && m.length > 1 ? m[1] : ''
      //               // 2.获取代码块内的html和js代码
      //               let content = tokens[idx + 1].content
      //               // 3.使用自定义开发组件【DemoBlock】来包裹内容并且渲染成案例和代码示例
      //               return `<demo-block>
      //             <div slot="source">${content}</div>
      //             <div>${markdownRender.render(description)}</div>
      //             <div slot="highlight">`
      //             } else {
      //               return '</div></demo-block>\n'
      //             }
      //           }
      //         }
      //       ]
      //     ]
      //   }
      // }
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
