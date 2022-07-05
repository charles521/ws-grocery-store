'use strict'
const path = require('path')
const defaultSettings = require('./examples/settings.js')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '组件库' // page title

const port = process.env.port || process.env.npm_config_port || 9528 // dev port

const pages = {
  index: {
    entry: 'examples/main.js',
    template: 'public/index.html',
    filename: 'index.html'
  }
}

module.exports = {
  pages: pages,
  // 强制内联CSS
  css: { extract: false },
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: () => {
    return {
      name: name,
      resolve: {
        alias: {
          '@': resolve('examples')
        }
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('prefetch')
    config.module
      .rule('scss')
      .oneOf('vue')
      .end()
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  }
}
