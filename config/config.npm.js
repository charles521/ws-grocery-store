const { resolve, getComponentEntries } = require('./utils')
const TerserPlugin = require('terser-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const npmBuildConfig = {
  // 输出文件目录
  outputDir: resolve('lib'),
  // webpack配置
  configureWebpack: {
    //  入口文件
    entry: getComponentEntries('packages'),
    //  输出配置
    output: {
      //  文件名称
      filename: '[name]/index.js',
      //  构建依赖类型
      libraryTarget: 'umd',
      umdNamedDefine: false,
      //  依赖输出
      libraryExport: 'default',
      //  依赖名称
      library: 'ws-grocery-store'
    },
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      },
      axios: {
        root: 'Axios',
        commonjs: 'axios',
        commonjs2: 'axios',
        amd: 'axios'
      },
      vant: {
        root: 'Vant',
        commonjs: 'vant',
        commonjs2: 'vant',
        amd: 'vant'
      },
      'vue-router': {
        root: 'VueRouter',
        commonjs: 'VueRouter',
        commonjs2: 'VueRouter',
        amd: 'VueRouter'
      }
    },
    plugins: [
      new ParallelUglifyPlugin({

        test: new RegExp('\\.(' + ['js'].join('|') + ')$')
      })
    ],
    optimization: {
      minimizer: [ // 定制压缩选项
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false // 去掉注释
            }
          }
        })
      ]
    }
  },
  //  样式输出
  css: {
    sourceMap: true,
    extract: {
      filename: '[name]/style.css'
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('html')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')
  }
}

module.exports = npmBuildConfig
