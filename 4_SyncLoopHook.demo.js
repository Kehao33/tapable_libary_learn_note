const { SyncLoopHook } = require("tapable")

/**
 * SyncLoopHook  同步执行，
 * 当遇到某个不返回 undefined 的监听函数会从第一个插件继续重新启动，
 * 直到多个插件都 返回 undefined 值
 */
class Lesson {
  constructor() {
    this.index = 0;

    this.hooks = {
      arch: new SyncLoopHook(['techName']),
    }
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tap("react", (data) => {
      // 这个data 是上一个 tapped function return的数据
      console.log("react: ", data);
    });
    this.hooks.arch.tap("node", (techName) => {
      console.log("node: ", techName);
      return ++this.index === 3 ? undefined : "continue"
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