/**
 * AsyncSeriesHook 
 */
class AsyncSeriesHook {
  constructor(args) {
    // 字符串数组
    this.tasks = []; // 用来存放tap的方法任务
  }
  tapPromise(name, task) {
    // 每次注册监听函数的时候，将事件名字push到tasks中
    this.tasks.push(task)
  }
  promise(...args) {
    const [first, ...others] = this.tasks;
    // redux 源码相同
    return others.reduce((p, n) => {
      return p.then(() => n(...args))
    }, first(...args));
  }
}

const hook = new AsyncSeriesHook(['name']);
let total = 0;

hook.tapPromise("react", (techName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("react ", techName);
      resolve();
    }, 1000);
  })
})

hook.tapPromise("node", (techName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("node", techName)
      resolve();
    }, 1000);
  })
})

hook.promise("pink").then(() => {
  console.log("end")
}).catch(() => {
  console.log("error");
})