/**
 * AsyncSeriesHook  异步串行钩子
 */
class AsyncSeriesHook {
  constructor(args) {
    // 字符串数组
    this.tasks = []; // 用来存放tap的方法任务
  }
  tapAsync(name, task) {
    // 每次注册监听函数的时候，将事件名字push到tasks中
    this.tasks.push(task)
  }
  callAsync(...args) {
    const finalCallback = args.pop();
    let index = 0;

    const next = () => {
      if (this.tasks.length === index) return finalCallback();

      let task = this.tasks[index++];
      task(...args, next)
    }

    next();
  }
}

const hook = new AsyncSeriesHook(['name']);
let total = 0;

hook.tapAsync("react", (techName,cb) => {
  setTimeout(() => {
    console.log("react ", techName);
    cb();
  }, 1000);
})

hook.tapAsync("node", (techName,cb) => {
  setTimeout(() => {
    console.log("node", techName)
    cb();
  }, 1000);
})

hook.callAsync("pink", () => {
  console.log("end")
})