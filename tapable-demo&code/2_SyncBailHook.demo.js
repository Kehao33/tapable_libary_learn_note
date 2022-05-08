const { SyncBailHook } = require("tapable")

/**
 * SyncBailHook 只要tapped 的一个方法返回了 非 undefined 的值，
 * 那么剩余的 tapped （注册）事件将不会再执行了
 */
class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(['techName']),
    }
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tap("node", (techName) => {
      console.log("node: ", techName);
      return null
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