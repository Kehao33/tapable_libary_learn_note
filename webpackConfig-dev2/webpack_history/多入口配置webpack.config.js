const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  // 多入口的entry是一个对象
  mode: "development",
  entry: {
    home: "./src/index.js",
    other: "./src/other.js",
  },
  output: {
    // [name] 表示分别得到home和other的entry入口文件的名字
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "home.html",
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: "./index.html", // 指定html模板的位置
      filename: "other.html", // 指定打包后的文件名字
      chunks: ['other'] // 指定html模板依赖的代码文件
    })
  ]
}