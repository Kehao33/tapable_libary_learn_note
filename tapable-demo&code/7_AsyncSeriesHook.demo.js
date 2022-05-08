const { AsyncSeriesHook } = require("tapable")

/**
 * AsyncSeriesHook  异步串行钩子，执行的任务是串行的
 */
class Lesson {
  constructor() {
    this.index = 0;

    this.hooks = {
      arch: new AsyncSeriesHook(['techName']),
    }
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tapAsync("react", (teacherName, cb) => {
      setTimeout(() => {
        console.log("react: ", teacherName);
        cb()
      }, 1000);
    });
    this.hooks.arch.tapAsync("node", (teacherName, cb) => {
      setTimeout(() => {
        console.log("node: ", teacherName);
        cb()
      }, 1000);
    });
  }
  start() {
    // 执行钩子里的函数
    this.hooks.arch.callAsync("pink",() => {
      console.log("end");
    })
  }
}

const l = new Lesson();
l.tap(); // 注册两个事件
l.start(); // 启动钩子