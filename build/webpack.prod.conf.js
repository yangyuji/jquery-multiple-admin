const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const extractTextPlugin = require("extract-text-webpack-plugin");
const webpackConfigBase = require('./webpack.base.conf');
const util = require("./utils");

const webpackConfigProd = {
  mode: 'production', // 通过 mode 声明生产环境
  plugins: [
    //删除docs目录
    new cleanWebpackPlugin(['docs'], {
      root: path.resolve(__dirname, '../'), //根目录
      verbose: true, //开启在控制台输出信息
      dry: false,
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
    }),
    // 分离css插件参数为提取出去的路径
    new extractTextPlugin({
      filename: util.assetsPath('css/[name].[hash:5].css')
    }),
    //压缩css
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    //上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: false,
          drop_console: true
        }
      }
    })
  ]

}
module.exports = merge(webpackConfigBase, webpackConfigProd);