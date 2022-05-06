const { AsyncSeriesWaterfallHook } = require("tapable")

/**
 * AsyncSeriesWaterfallHook  异步串行钩子，执行的任务是串行的
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
    this.hooks.arch.tapAsync("react", (teacherName, cb) => {
      setTimeout(() => {
        console.log("react: ", teacherName);
        // callback 的回调函数 接受的第一位错误参数、如果错误参数不为 null，则会将后边的数据传递给下一个接听函数
        // 第二个为传递的data
        // cb(new Error("错误"),"result data")
        cb(null,"result data")
      }, 1000);
    });
    this.hooks.arch.tapAsync("node", (passData, cb) => {
      setTimeout(() => {
        console.log("node: ", passData);
        cb(null)
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