const { SyncWaterfallHook } = require("tapable")

/**
 * SyncWaterfallHook 当前的tapped function
 *  return的结果可以作为入参传递给下一个tapped function 
 */
class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(['techName']),
    }
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tap("node", (techName) => {
      console.log("node: ", techName);
      return "pass to next hook"
    });
    this.hooks.arch.tap("react", (...data) => {
      // 这个data 是上一个 tapped function return的数据
      console.log("react: ", data);
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