// way1: 使用num toLocaleString()方法可以将数字每3位分割一手
// const paddingNumber = (num) => {
//   return num.toLocaleString()
// }

const paddingNumber = (num) => {
  if (!num) return "";

  const isNegative = num < 0;
  const strNum = "" + num;

  if (strNum.length < 3) return strNum;

  const [beforePoint, pointNum] = strNum.split(".");
  const sign = isNegative ? beforePoint[0] : "";

  const iteratorString = beforePoint.replace("-", "")



  let res = [];// 每三个分成一组
  let i = iteratorString.length;

  for (i; i >= 3; i -= 3) {
    res.unshift(iteratorString.slice(i - 3, i))
  }

  if (iteratorString.substring(0, i)) {
    res.unshift(iteratorString.substring(0, i))
  }

  res = pointNum ? `${res.join(",")}.${pointNum}` : res.join(",");

  return `${sign}${res}`

}

// console.log(paddingNumber(33))
// console.log(paddingNumber(1234.56))
// console.log(paddingNumber(123456789))
// console.log(paddingNumber(987654.321))
// console.log(paddingNumber(1987654.321))
// console.log(paddingNumber(-987654.3))


const duplicateWord = (arr) => {
  if (!Array.isArray(arr) || !arr.length) return null;

  const map = new Map();
  let result = {}

  for (const v of arr) {
    const isExist = map.has(v);

    if (!isExist) map.set(v, 1)

    result = { ...result, [v]: isExist }
  }
  console.log(JSON.stringify(result))
  return result;
}

// duplicateWord(['a', 'b', 'a', 'b', 'c'])
// duplicateWord(['a', 'b', 'c'])
// duplicateWord(['a', 'a', 'a', 'a'])

const redline = require('readline');


const readLine = redline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let lineCount = 0;

readLine.on("line", (input) => {
  lineCount += 1;

  if (lineCount === 1) {
    const inputArr = input.split("");
    for (let i = 0; i < inputArr.length; i++) {
      // 找打了left括号
      const left = inputArr.indexOf("(");
      const right = inputArr.indexOf(")", left);

      // 计算两个之间有多少个字符
      const strNum = right + 1 - left;
      inputArr.splice(left, strNum);
      i += strNum;
    }
    console.log("inputArr>>", inputArr)

  }
})