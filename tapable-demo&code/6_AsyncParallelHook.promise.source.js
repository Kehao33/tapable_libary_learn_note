/**
 * AsyncParallelHook  异步并行钩子
 */
class AsyncParalleHook {
  constructor(args) {
    // 字符串数组
    this.tasks = []; // 用来存放tap的方法任务
  }
  tapPromise(name, task) {
    // 每次注册监听函数的时候，将事件名字push到tasks中
    this.tasks.push(task)
  }
  // 同步的钩子
  promise(...args) {
    const results = this.tasks.map(task => task(...args));
    return Promise.all(results)
  }
}

const hook = new AsyncParalleHook(['name']);
let total = 0;

hook.tapPromise("react", (techName,) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("react ", techName);
      resolve();
    }, 1000);
  })
})

hook.tapPromise("node", (techName,) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("node", techName)
      reject();
    }, 1000);
  })
})

hook.promise("pink").then(() => {
  console.log("async parall_promise call end.")
}).catch(e => console.log(e,"err<<"))