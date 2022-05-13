#! /usr/bin/env node
const path = require("path")

// 1. 需要找到 当前执行 命令的 路径 并拿到 webpack.config.js 配置文件

// config 配置文件
const config = require(path.resolve("webpack.config.js"));

const Compiler = require("../lib/Compiler.js");
const compiler = new Compiler(config);
compiler.hooks.entryOptoin.call();
// 运行编译
compiler.run();