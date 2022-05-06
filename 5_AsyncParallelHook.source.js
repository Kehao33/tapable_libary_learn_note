/**
 * AsyncParallelHook  异步并行钩子函数
 * 一个异步并行钩子也可以使用同步来实现，基于回调和基于promise functions（使用 myHook.tap(),myHook.tapAsync() 和 myHook.tapPromise()
 * 它们连续调用异步方法
 * 
 * 注册方法 分为 tap 注册（同步的），tapAsync 
 */
class AsyncParalleHook {
  constructor(args) {
    // 字符串数组
    this.tasks = []; // 用来存放tap的方法任务
  }
  tapAsync(name, task) {
    // 每次注册监听函数的时候，将事件名字push到tasks中
    this.tasks.push(task)
  }
  // 同步的钩子
  callAsync(...args) {
    const finalCallback = args.pop(); // 拿出最终函数
    let index = 0;
    const done = () => {
      index++;
      if (index === this.tasks.length) {
        // 只有注册的call执行后采取执行我们的finalCallback
        finalCallback();
      }
    }
    this.tasks.forEach(task => {
      task(...args, done)
    })
  }
}

const hook = new AsyncParalleHook(['name']);
let total = 0;

hook.tapAsync("react", (techName, cb) => {
  setTimeout(() => {
    console.log("react ", techName);
    cb();
  }, 1000);
})

hook.tapAsync("node", (techName, cb) => {
  setTimeout(() => {
    console.log("node", techName)
    cb();
  }, 1000);
})

hook.callAsync("pink", () => {
  console.log("async parall call end.")
})