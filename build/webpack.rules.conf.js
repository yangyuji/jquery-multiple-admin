const extractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const util = require('./utils')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const rules = [
  {
    test: /\.(css|scss|sass)$/,
    use: process.env.NODE_ENV === "development" ?
      ["style-loader", "css-loader", "sass-loader", "postcss-loader"] :
      extractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader", "postcss-loader"]
      })
  }, {
    test: /\.js$/,
    loader: 'babel-loader?cacheDirectory',
    include: [
      resolve('src'),
      resolve('test'),
      resolve('node_modules/webpack-dev-server/client')
    ]
  }, {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    use: [{
      // 需要下载url-loader
      loader: "url-loader",
      options: {
        limit: 5 * 1024, // 小于时将会已base64位图片打包处理
        name: util.assetsPath('img/[name].[hash:5].[ext]')
      }
    }]
  }, {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: util.assetsPath('media/[name].[hash:5].[ext]')
    }
  }, {
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: util.assetsPath('fonts/[name].[hash:5].[ext]')
    }
  }, {
    test: /\.html$/,
    // html中的img标签
    use: {
      loader: 'html-loader',
      options: {
        attrs: ['img:src', 'img:data-src', 'audio:src'],
        minimize: true
      }
    }
  }
];
module.exports = rules;