/**
 * SyncLoopfallHook 的tapped 的function 返回的结果可以作为 next tapped function的入参供其使用使用
 */
class SyncLoopfallHook {
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
    this.tasks.forEach(task => {
      let ret;
      do {
        ret = task(...args);
      } while (ret !== undefined)
    })
  }
}

const hook = new SyncLoopfallHook(['name']);
let total = 0;

hook.tap("react", (techName) => {
  console.log("react ", techName)
  return ++total === 3 ? undefined : "react success"
})

hook.tap("webpack", (techName) => {
  console.log("webpack", techName)
})

hook.tap("node", (techName) => {
  console.log("node", techName)
})

hook.call("pink")