/**
 * SyncWaterfallHook 的tapped 的function 返回的结果可以作为 next tapped function的入参供其使用使用
 */
class SyncWaterfallHook {
  constructor(args) {
    // 字符串数组
    this.tasks = []; // 用来存放tap的方法任务
  }
  tap(name, task) {
    // 每次注册监听函数的时候，将事件名字push到tasks中
    this.tasks.push(task)
  }
  // 同步的钩子
  call(...args) {
    const [firstFn, ...otherFn] = this.tasks;
    let ret = firstFn(...args);

    otherFn.reduce((acc, currFn) => {
      return currFn(acc)
    }, ret)
  }
}

const hook = new SyncWaterfallHook(['name']);

hook.tap("react", (techName) => {
  console.log("react ", techName)
  return "react success"
})

hook.tap("webpack", (lastData) => {
  console.log("webpack", lastData)
  return "webpack success"
})

hook.tap("node", (lastData) => {
  console.log("node", lastData)
})

hook.call("pink")