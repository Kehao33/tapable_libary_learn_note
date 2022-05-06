
// SyncHook 是一个同步连续执行的钩子
class SyncHook {
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
    this.tasks.forEach((task) => task(...args))

  }
}

const hook = new SyncHook(['name']);

hook.tap("react", (techName) => {
  console.log("react ", techName)
})

hook.tap("node", (techName) => {
  console.log("node", techName)
})

hook.call("pink")