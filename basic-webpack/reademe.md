## Webpack 安装
- 安装本地的webpack
- `yan add webpack webpack-cli -D` [-D 表示还有开发依赖，上线的时候不需要它]


## webpack 可以进行0配置
- 打包工具 -> 输出后的结果 （支持我们的js模块）
- 但是这样的0配置只打包js文件 让node中的的模块也可以在浏览器中运行
- 不信你可以在没有webpack.config.js的配置文件时 `npx webpack` 一下

## 手动配置 webpack
- 默认配置的文件名字叫做webpack.config.js [在项目根目录下创建]
- webpack 是node写出来的，需要使用node的写法来写
- yarn add webpack-dev-server -D 来实现自动打开文件[ webpack-dev-server 内部是使用express]
- loader 的作用将我们的源代码带包成对应的模块
- babel-loader 的作用是让ES6代码可以转化为ES5模块，这样能兼容某些老的浏览器，保证最新的JS API能在浏览器引擎里能够很好的执行
- @babel/core 是babel的核心代码包，可以调用transform转化代码
- @babel/preset-env 可以将高级的语法转化为低级的语法
- file-loader 默认会在内部生成一张图片 到build 目录下，把生成的图片的名字返回回来

## 项目开始
1. `yarn init -y `=> 初始化项目 生成 package.json
2. 创建src 文件后写代码 执行 npx webpack 命令 => 对项目进行打包，然后会生成dist文件目录下有个main.js
3. main.js可以直接运行
