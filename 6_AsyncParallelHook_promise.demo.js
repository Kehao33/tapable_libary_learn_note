const { AsyncParallelHook } = require("tapable")

/**
 * AsyncParallelHook  异步并行钩子
 * 注册方法 分为 tap 注册（同步的），tapPromise 注册的回调函数必须返回一个 promise 实例
 */
class Lesson {
  constructor() {
    this.index = 0;

    this.hooks = {
      arch: new AsyncParallelHook(['techName']),
    }
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tapPromise("react", (teacherName) => {
      // tapPromise 注册的监听函数必须return 一个promise
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
          reject()
        }, 1000);
      })
    });
  }
  start() {
    // 执行钩子里的函数
    this.hooks.arch.promise("pink").then(() => {
      console.log("end");
    }).catch(e => console.log(e,"err<<"));
  }
}

const l = new Lesson();
l.tap(); // 注册两个事件
l.start(); // 启动钩子