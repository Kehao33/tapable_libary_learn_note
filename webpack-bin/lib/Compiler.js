const fs = require("fs");
const path = require("path");
const babylon = require("babylon")
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const ejs = require("ejs");
const { SyncHook } = require("tapable")


// babylon 主要是吧源码转化成 AST
// @babel/traverse 主要是遍历源码
// @babel/types
// @babel/generator

class Compiler {
  constructor(config) {
    // config 包含了entry output等
    this.config = config
    // 需要保存 入口文件的路径
    this.entryId;
    // 需要保存 所有的模块依赖
    this.modules = {};
    this.entry = config.entry;
    // 当前工作路径
    this.root = process.cwd();
    this.hooks = {
      entryOptoin: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    }

    // 如果传递了plugins 参数
    const plugins = this.config.plugins;
    // 如果plugins 传递了，则执行里边的apply方法
    if (Array.isArray(plugins)) {
      plugins.forEach(plugin => {
        plugin.apply(this)
      })
    }
    this.hooks.afterPlugins.call();
  }

  getSource(modulePath) {
    const rules = this.config.module.rules;

    let content = fs.readFileSync(modulePath, "utf8");
    // 拿到每个规则来处理
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      const { test, use } = rule;
      let len = use.length - 1;
      // 匹配上了 匹配规则，则通过对应的loader来转化
      if (test.test(modulePath)) {

        // loader 获取 对应的 loader 函数
        function normalLoader() {
          let loader = require(use[len--]);
          // 递归调用loader 实现 转化 功能
          content = loader(content);

          if (len >= 0) {
            normalLoader();
          }
        }

        normalLoader();
      }
    }
    return content;
  }

  // 解析源码 AST 抽象语法树
  parse(source, parentPath) {
    const ast = babylon.parse(source)
    const dependencies = []; // 依赖数组
    traverse(ast, {
      CallExpression(p) {
        const node = p.node; // 获取对应的节点
        if (node.callee.name === "require") {
          node.callee.name = "__webpack_require__";

          let moduleName = node.arguments[0].value; // 去到的就是模块的引用名字

          moduleName = moduleName + (path.extname(moduleName) ? "" : ".js");
          moduleName = "./" + path.join(parentPath, moduleName); // "src/a.js"
          dependencies.push(moduleName)

          node.arguments = [t.stringLiteral(moduleName)]
        }
      }
    });

    //  重新生成一下被转化后的代码
    const sourceCode = generator(ast).code;

    return {
      sourceCode,
      dependencies
    }
  }

  // 构建模块之间的依赖关系
  buildModule(modulePath, isEntry) {
    // 拿到模块的内容
    const source = this.getSource(modulePath);

    // 模块id的路径（是一个相对路径） = modulePath - this.root;
    const moduleName = "./" + path.relative(this.root, modulePath);
    // 保存入口的名名字
    if (isEntry) {
      this.entryId = moduleName
    }
    //  解析需要把 source 源码进行改造 返回一个依赖列表 path.dirname(path) 可以得到目录文件
    const { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName))
    // 把相对路径和模块中的内容 对应起来
    this.modules[moduleName] = sourceCode;

    // 附模块的加载，递归加载
    dependencies.forEach(dep => {
      this.buildModule(path.join(this.root, dep), false)
    })
  }

  // 发射文件
  emitFile() {
    // 拿到 输出到哪个目录下
    const main = path.join(this.config.output.path, this.config.output.filename);
    // 模板路径
    const templateStr = this.getSource(path.join(__dirname, "main.ejs"));
    const code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules
    })

    this.assets = {};
    // 资源中 路径对应的代码
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main]);
  }


  run() {
    this.hooks.compile.call();
    // 执行 并且创建 模块的依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true);
    this.hooks.afterCompile.call();
    // 发射一个文件，打包后的文件
    this.emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();
  }
}


module.exports = Compiler