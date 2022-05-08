const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// 拷贝插件
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");


// cleanWebpackPlugin
// copyWebpackPlugin
// bannerPlugin 内置的

module.exports = {
  // 多入口的entry是一个对象
  entry: {
    home: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // 1.source-map 映射代码，会单独生成一个sourcemap文件，出错了会表示错误的位置（行列）
  // devtool: "source-map", // 增加映射文件，可以帮我们调试源代码能够快速的定位错误在哪里
  // 2. eval-source-map 不会生成单独的文件，但是可以显示行和列
  // devtoll: "eval-source-map", 
  // 3. cheap-module-source-map 不糊产生列，但是是一个单独的映射文件，产生后可以保留起来
  // devtool: "cheap-module-source-map",
  // 4. cheap-module-eval-source-map 不会生成文件，继承在打包后的文件中，不会产生列
  devtool: "cheap-module-eval-source-map",
  // 即时监控
  watch: true,
  watchOptions: {
    //  监控选项
    poll: 1000, // 每1000次轮询一次
    aggregateTimeout: 500, // 防抖的作用
    ignored: /node_modules/  // 忽略那个文件可以省略
  },
  resolve: {
    // resolver 模块负责解析第三方包
    // 告诉我们的modules在哪里去查找
    modules: [path.resolve("node_modules")],
    // 规定去找第三方的顺序
    mainFields: ['style','main'],
    alias: {
      // 别名,引入的 boostrap的时候可以自动引入对应的value
      bootstrap: "bootstrap/dist/css/bootstrap.css"
    }
  },
  devServer: {
    // 3.  
    // 1. 我们前端只想单纯来mock数据，可以在devserver的before中使自带的express来模拟数据 ,但是要注意取消代理
    // before(app){
    //   app.get("/api/user",(req,res) =>{
    //     res.json({name: "webpack express mock data"})
    //   })
    // },
    // 2. 使用代理
    // proxy: {
    //   '/api/': "http://localhost:3000" // 配置代理，解决跨域
    //   /**
    //    * 还可以这样写
    //    * '/api': {
    //    *    target: "http://localhost:3000",
    //    *    pathRewrite: {"/api":""} // 意思是去掉/api的前缀
    //    * }
    //    */
    // }
  },
  output: {
    // [name] 表示分别得到home和other的entry入口文件的名字
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      chunks: ['home']
    }),
    // 这个插件会在每次build的时候给我们清空dist文件夹
    new CleanWebpackPlugin('./dist'),
    // 拷贝插件
    new CopyWebpackPlugin([{
      from: "./doc",
      to: "./"
    }]),
    //  BannerWebpackPlugin 的作用 给代码标明版权
    new webpack.BannerPlugin("Code By JakeQuc 2022"),
    new webpack.DefinePlugin({
      DEV: JSON.stringify('production') // 这里定义全局变量
    })
  ]
}