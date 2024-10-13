# Tarobest

Tarobest 是一个脚手架工具，提供快速生成代码的能力，内置多个简单封装 taro 的基础模板以及基础vue，react模版，也可手动添加自定义模板，解决了官方脚手架每次需要从零开始创建项目的麻烦。

## 特点

- 支持自定义模板。
- 简单封装，易于阅读，无黑盒。
- 提供开发模式打包优化，开发模式下可以有更快的冷启动速度。

## 用法

```bash
npm install -g tarobest
tb create
```

## 本地开发启动流程

```bash
git clone https://github.com/Tarobest/Tarobest.git
cd Tarobest
pnpm i
# 新建终端
pnpm run dev
# 新建终端
npm link
tb install
tb create
```

### 本地开发 Q&A


## 目录结构

```
Tarobest
└── src
    ├── constants // 常量
    ├── meta // 通用资源
    ├── model // 模型
    ├── plugins // 插件
    ├── template // 模板
    ├── types // 类型
    └── utils // 工具函数
```



## TODO LIST

- [ git 克隆第三方仓库 ]：允许通过git clone的方式添加第三方模板（通过配置文件？）
- [ react-i18n 模版生成 ]：基于 react模板上进行生产i18n配置
- 保存本地模板：可以保存本地的自定义模板（通过配置文件？）
- [ 别名配置 ]：rollup 别名问题解决
- [ cli 选项配置 ]：支持通过命令行参数直接传递值，如：`tb init --name=xxx`，`tb init --template=xxx`
- [ 开发体验优化 ]：支持通过命令行参数调用`npm run dev`
- [ vue 模版 ]：tarobest vue模板支持
- [ 通过vue cli等生成普通vue，react 模板 ]
- 更多大饼...