require("@babel/polyfill")
const src = require("./a.js")
import logo from "./p8.jpg" // 引入图片，返回的结果是一个新的图片地址

require("./index.css")
require("./index.less")
console.log(src)


const fn = () => {
  console.log("ES6 arrow function")
}

function log() {
  console.log("Decorator")
}

fn()

@log
class A {
  a = 1;
}
const image = new Image();
console.log(logo, "<<<<")
image.src = logo
document.body.appendChild(image)

const aInstance = new A();
console.log(aInstance.a)

"jake".includes("ja")