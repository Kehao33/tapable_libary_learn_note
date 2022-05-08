

import "bootstrap"
const xhr = new XMLHttpRequest();

if(DEV ==='dev'){
  console.log("dev 环境")
}else{
  console.log("other 环境")
}

// 这个相当于 默认会访问 http://localhost:8080 端口 8080是webpack-dev-server的服务，使用代理即可转发接口
xhr.open("GET", "/api/user", true);

xhr.onload = () => {
  console.log("xhr:", xhr.response);
}

// 发送请求
xhr.send();

// console.log("index.js")

// class Log {
//   constructor() {
//     console.log("have error")
//   }
// };

// const log = new Log();