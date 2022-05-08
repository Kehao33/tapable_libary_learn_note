const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  // import 在 生产环境下 会自动按需打包，自动去掉没有用的代码，这就是tree-shaking
  mode: "production",
  optimization: {
    // 分割代码块
    splitChunks: {
      // 缓存组
      cacheGroups: {
        // 公共模块
        common: {
          chunks: "initial",
          minSize: 0,
          // 至少用过一次
          minChunks: 2,
        },
        vendor: {
          priority: 1, // 告诉权重 
          test: /node_modules/, // 只要引入了第三方包，则抽离出来
          chunks: "initial",
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  entry: {
    index: "./src/index.js",
    other: "./src/test.js"
  },
  devServer: {
    hot: true, // 启用热更新
    port: 3000,
    // 自动打开浏览器
    open: true,
    contentBase: "./dist"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    // 不去解析 jquery中的依赖项
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        // 排除哪些不用babel-loader转化
        exclude: /node_modules/,
        include: path.resolve("src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env',
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ]
}