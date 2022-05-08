//  webpack 是node写出来的，需要使用node的写法来写
const path = require("path");
// html-webpack-plugin 的作用是： 当使用webpack打包时，创建一个html文件，并把webpack打包后的静态文件自动插入到这个html文件中
const HtmlWebpackPlugin = require("html-webpack-plugin");
// mini-css-extract-plugin 作用格式抽取出css样式，防止将样式打包在js文件中导致文件过大
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 优化js插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 优化css资源插件
const OptimizeCss = require("optimize-css-assets-webpack-plugin");

/**
 * path.resolve() 可以把相对路径解析为绝对路径
 */
module.exports = {
  // optimization: { // 优化项
  //   minimizer: [ // 因为可能有很多的优化，所以是一个数组
  //     // 压缩
  //     new OptimizeCss(),
  //     new UglifyJsPlugin({
  //       cache: true, // 设置缓存
  //       parallel: true, // 并发打包
  //       sourceMap: true,
  //     })
  //   ]
  // },
  devServer: {
    port: 3000,
    progress: true,
    contentBase: "./build", // 配置静态服务
    compress: true, // 配置压缩
  },
  mode: "development", // 模式，默认两种： production development
  entry: "./src/index.js", // 入口文件
  output: {
    filename: "bundle.[hash:8].js", // 打包后的文件
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
      // 配置导出的文件名字
      filename: "main.css",
    })
  ],
  module: {
    // 模块
    rules: [
      // {
      //   // 配置eslint校验
      //   test: /\.js/,
      //   use: {
      //     // loader 默认是从右边向作伴执行，从下到上执行，但是当我们配置enforce:"pre" 这个配置就会先执行
      //     loader: "eslint-loader",
      //     options: {
      //       enforce: "pre",
      //     }
      //   },
      // },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            // 用babel-loader 把es6转化为es5
            presets: [
              "@babel/preset-env"
            ],
            "plugins": [
              // 支持class语法
              "@babel/plugin-transform-runtime",
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      // 规则 css-loader 处理 @imort 这种语法
      // style-loadeer 把css插入到head标签中
      // loader 的特点就是单一原则
      // 如果只是用一个loader，可以给use配置一个字符串值，如果是多个则可以配置一个数组织
      // loader 可以放在对象中
      // loader 的执行顺序是 从右向左执行的 从上到下执行
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  }
}