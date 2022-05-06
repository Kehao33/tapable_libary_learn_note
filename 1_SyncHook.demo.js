const { SyncHook } = require("tapable")
// SyncHook 是一个同步连续执行的钩子
class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['techName']),
    }
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tap("node", (techName) => {
      console.log("node: ", techName);
    });
    this.hooks.arch.tap("react", (techName) => {
      console.log("react: ", techName);
    });
  }
  start() {
    // 执行钩子里的函数
    this.hooks.arch.call("pink");
  }
}

const l = new Lesson();
l.tap(); // 注册两个事件
l.start(); // 启动钩子