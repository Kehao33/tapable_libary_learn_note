
/**
 * AsyncSeriesWaterfallHook  异步串行 瀑布式 钩子
 */
class AsyncSeriesWaterfallHook {
  constructor() {
    // 字符串数组
    this.tasks = []; // 用来存放tap的方法任务
  }
  tapAsync(name, task) {
    // 每次注册监听函数的时候，将事件名字push到tasks中
    this.tasks.push(task)
  }
  callAsync(...args) {
    let index = 0;
    const finalCallback = args.pop();
    const next = (err, data) => {

      const task = this.tasks[index];

      if (!task) return finalCallback();

      if (index === 0) {
        //  执行的是第一个
        task(...args, next);
      } else {
        task(data, next)
      }

      index++;
    }

    next();
  }
}

const hook = new AsyncSeriesWaterfallHook(['name']);
let total = 0;

hook.tapAsync("react", (techName, cb) => {
  setTimeout(() => {
    console.log("react ", techName);
    cb(null, "pass data");
  }, 1000);
})

hook.tapAsync("node", (techName, cb) => {
  setTimeout(() => {
    console.log("node", techName)
    cb(null);
  }, 1000);
})

hook.callAsync("pink", () => {
  console.log("end")
})