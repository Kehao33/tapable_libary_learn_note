const path = require("path");
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: {
    react: ['react', "react-dom"],
  },
  output: {
    filename: "_dll_[name].js", // 产生的文件名字
    path: path.resolve(__dirname, "dist"),
    // 指定打包后的library 名字
    library: "_dll_[name]",
    libraryTarget: "var"
  },
  plugins: [
    new webpack.DllPlugin({
      // name要等于libarary
      name: "_dill_[name]",
      path: path.resolve(__dirname, "dist", "manifest.json")
    })
  ]
}