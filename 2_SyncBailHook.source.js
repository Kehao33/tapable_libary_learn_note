/**
 * SyncBailHook 只要tapped 的一个方法返回了 非 undefined 的值，
 * 那么剩余的 tapped事件将不会再执行了
 */
class SyncBailHook {
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
    let ret; // 当前这个函数的执行结果
    let index = 0; // 当前要先执行第一个

    do {
      ret = this.tasks[index] && this.tasks[index](...args);
      index += 1;
    } while (ret === undefined && this.tasks.length > index)
  }
}

const hook = new SyncBailHook(['name']);

hook.tap("react", (techName) => {
  console.log("react ", techName)
})

hook.tap("node", (techName) => {
  console.log("node", techName)
})

hook.call("pink")