const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// 模块 happypack 可以实现多线程来打包  
const  pappypack = require("happypack");


module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    port: 3000,
    // 自动打开浏览器
    open: true,
    contentBase: "./dist"
  },
  output: {
    filename: "bundle.js",
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html"
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    // 动态链接库
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "dist", "manifest.json")
    })
  ]
}