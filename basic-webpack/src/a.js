
// module.export = "jakequc";
// import $ from "jquery";

// console.log("window.$",window.$);
// console.log($)


// function* gen() {
//   yield 1;
// }

// console.log(gen().next())

// webpack 打包我们的图片
import logo from "./p8.jpg" // 引入图片，返回的结果是一个新的图片地址
const image = new Image();
console.log(logo,"<<<<")
image.src =logo