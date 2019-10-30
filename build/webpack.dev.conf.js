const path = require('path');
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');

const webpackConfigDev = {
  mode: 'development', // 通过 mode 声明开发环境

  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, "../src/pages/index"),
    publicPath: '/',
    host: "127.0.0.1",
    port: "8080",
    overlay: true, // 浏览器页面上显示错误
    open: true, // 开启浏览器
    // stats: "errors-only", //stats: "errors-only"表示只打印错误：
    //服务器代理配置项
    proxy: {
      '/api': {
        target: 'https://api.domain.com',
        secure: true,
        changeOrigin: true
      }
    }
  },
}
module.exports = merge(webpackConfigBase, webpackConfigDev);