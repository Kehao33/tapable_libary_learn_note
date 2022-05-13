const path = require("path")

class P {
  apply(compiler) {
    compiler.hooks.emit.tap("emit", function () {
      console.log("emit plugin running...");
    })
  }
}
class P1 {
  apply(compiler) {
    compiler.hooks.afterCompile.tap("emit", function () {
      console.log("afterCompile plugin running...");
    })
  }
}

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.less/,
        use: [
          path.resolve(__dirname, "loader", "style-loader"),
          path.resolve(__dirname, "loader", "less-loader")
        ]
      }
    ]
  },
  plugins: [
    new P(),
    new P1(),
  ]
}