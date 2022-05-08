const { AsyncParallelHook } = require("tapable")

/**
 * AsyncParallelHook  异步并行钩子函数
 * 一个异步并行钩子也可以使用同步来实现，基于回调和基于promise functions（使用 myHook.tap(),myHook.tapAsync() 和 myHook.tapPromise()
 * 它们连续调用异步方法
 * 
 * 注册方法 分为 tap 注册（同步的），tapAsync 
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
    this.hooks.arch.tapAsync("react", (teacherName,cb) => {
      setTimeout(() => {
        console.log("react: ", teacherName);
        cb() 
        // 每个tapAsync 注册的方法都有一个回调方法，
        // 执行完后需要手动调用这个回调方法，
        // 只要有一个异步注册监听函数没有调用这个异步回调方法，
        // 都不会执行callAsync 的回调方法
        // 只有cb执行的计数器次数等于 tapAsync注册的回调函数次数才会去执行 allAsync 里的方法
      }, 1000);

    });
    this.hooks.arch.tapAsync("node", (techName,cb) => {
      setTimeout(() => {
        console.log("node: ", techName);
        cb(); // 如果注释掉这一行，则callAsync 里的callback将不会执行
      }, 1000);
    });
  }
  start() {
    // 执行钩子里的函数
    this.hooks.arch.callAsync("pink",() => {
      console.log("end");
    });
  }
}

const l = new Lesson();
l.tap(); // 注册两个事件
l.start(); // 启动钩子