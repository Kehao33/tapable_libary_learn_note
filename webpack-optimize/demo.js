
// view 1: 
async function foo() { console.log(await Promise.resolve("foo")) };
async function bar() { console.log(await "bar") };
async function baz() { console.log("baz") }

// foo();
// bar();
// baz();

// view 2: 

async function foo() {
  console.log(2);
  console.log(await Promise.resolve(8));
  console.log(9);
}

async function bar() {
  console.log(4);
  console.log(await 6);
  console.log(7);
}

// 1, 2, 3, 4, 5, 8, 9, 6, 7
// console.log(1);
// foo();
// console.log(3);
// bar();
// console.log(5);


// view 3: 
async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

async function foo() {
  const t0 = Date.now();
  await sleep(1500);
  console.log(Date.now() - t0);
}

// foo();

// view 4:
async function randomeDelay(id) {
  // 延迟 0~1000 毫秒
  const delay = Math.random() * 1000;

  return new Promise((resolve) => setTimeout(() => {
    console.log(`${id} finished`);
    resolve();
  }), delay)
}


async function foo() {
  const t0 = Date.now();
  await randomeDelay(0);
  await randomeDelay(1)
  await randomeDelay(2)
  await randomeDelay(3)
  await randomeDelay(4)
  console.log(`${Date.now() - t0}ms elapsed`);
}

// foo();

// view 5: 
async function addTwo(x) { return x + 2 }
async function addTree(x) { return x + 3 }
async function addFive(x) { return x + 5 }

async function addTen(x) {
  for (const fn of [addTwo, addTree, addFive]) {
    x = await fn(x);
  }

  return x;
}

addTen(9).then(console.log)

// view 6: 
function fooPromiseExecutor(resolve, reject) {
  setTimeout(reject, 1000, "bar");
}

function foo() {
  new Promise(fooPromiseExecutor);
}

foo()

// window.navigator
var ok={}