//  webpack 是node写出来的，需要使用node的写法来写
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 抽取css代码
/**
 * path.resolve() 可以把相对路径解析为绝对路径
 */
module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: "./build", // 配置静态服务
    compress: true, // 配置压缩
  },
  mode: "development", // 模式，默认两种： production development
  entry: "./src/index.js", // 入口文件
  output: {
    filename: "bundle.[hash:8   ].js", // 打包后的文件
    path: path.resolve(__dirname, "build"), // 打包的路径，必须是绝对路径
  },
  plugins: [
    // 数组，放着所有的Webpack插件
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 模板的位置
      filename: "index.html", // 打包后的名字
      minify: {
        removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: true, // 折叠一行
      },
      hash: true, // 开启hash戳
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
      
    })
  ],
  module: {
    // 模块
    rules: [
      // 规则 css-loader 处理 @imort 这种语法
      // style-loadeer 把css插入到head标签中
      // loader 的特点就是单一原则
      // 如果只是用一个loader，可以给use配置一个字符串值，如果是多个则可以配置一个数组织
      // loader 可以放在对象中
      // loader 的执行顺序是 从右向左执行的 从上到下执行
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              insertAt: "top"
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            options: {
              insertAt: "top"
            }
          },
          "css-loader",
          "less-loader"
        ]
      }
    ]
  }
}