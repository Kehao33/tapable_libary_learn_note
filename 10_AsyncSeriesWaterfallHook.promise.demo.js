const { AsyncSeriesWaterfallHook } = require("tapable")

/**
 * 需要自己实现 AsyncSeriesWaterfallHook promise 版本
 */
class Lesson {
  constructor() {
    this.index = 0;

    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['techName']),
    }
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tapPromise("react", (teacherName) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("react: ", teacherName);
          resolve()
        }, 1000);
      })
    });
    this.hooks.arch.tapPromise("node", (teacherName) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("node: ", teacherName);
          resolve()
        }, 1000);
      })
    });
  }
  start() {
    // 执行钩子里的函数
    this.hooks.arch.promise("pink").then(() => {
      console.log("end");
    }).catch((e) => console.log("error: ", e))
  }
}

const l = new Lesson();
l.tap(); // 注册两个事件
l.start(); // 启动钩子