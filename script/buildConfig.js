/* eslint-disable import/no-commonjs */
const fs = require("fs");
const path = require("path");

const regex = /defineAppConfig\s*\(\s*(\{.*\})\s*\)/s;
const defaultRegex = /{([\s\S]*?)}/;
const envRegex = /TARO_APP_SERVER=.*?(?=\n|$)/;

function readOriginConfig() {
  const data = fs.readFileSync(path.join(process.cwd(), "/src/app.config.ts"));
  // 匹配对象字符串
  const objString = data.toString().match(regex)[1];
  const func = new Function(`return ${objString}`);
  // 获取原对象
  const originConfig = func();
  return originConfig;
}
function readDefaultConfig() {
  // 读取配置文件
  const defaultData = fs.readFileSync(
    path.join(process.cwd(), "/src/tarobest.config.ts"),
  );
  const defaultString = defaultData.toString().match(defaultRegex)[1];

  const defaultFunc = new Function(`return {${defaultString}}`);
  const defaultConfig = defaultFunc();
  return defaultConfig;
}
function changeDevEnv(isServer) {
  const data = fs.readFileSync(path.join(process.cwd(), "/.env.development"));
  const devENV = data.toString();
  const finalEnv = devENV.replace(envRegex, "TARO_APP_SERVER=" + isServer);
  fs.writeFileSync(path.join(process.cwd(), "/.env.development"), finalEnv);
}
function buildDevConfigWithTab(
  devConfig,
  defaultConfig,
  taberLists,
  startPage,
) {
  devConfig.pages = [...taberLists.map(it => it.pagePath)];
  devConfig.entryPagePath = startPage;

  // 加入首页
  if (!devConfig.pages.includes(startPage)) {
    devConfig.pages.unshift(startPage);
  }
  // 合并配置
  defaultConfig.pages.forEach(it => {
    if (!devConfig.pages.includes(it)) {
      devConfig.pages.push(it);
    }
  });
}
function buildDevConfigWithoutTab(devConfig, defaultConfig) {
  if (defaultConfig.pages.length < 2) {
    throw new Error("default.config.ts 中 pages 不能元素小于2");
  }
  devConfig.pages = defaultConfig.pages;
  devConfig.entryPagePath = defaultConfig.pages[0];
  devConfig.tabBar.list = defaultConfig.pages.map(it => {
    return {
      pagePath: it,
      text: it.split("/").pop(),
    };
  });
}

function buildDevConfig(originConfig, defaultConfig) {
  const pages = originConfig.pages;
  const taberLists = originConfig.tabBar.list;
  const startPage = originConfig.entryPagePath || pages[0];
  const devConfig = { ...originConfig };
  // 是否打包tabbar页面
  if (defaultConfig.buildWithTab) {
    buildDevConfigWithTab(devConfig, defaultConfig, taberLists, startPage);
  } else {
    buildDevConfigWithoutTab(devConfig, defaultConfig);
  }

  changeDevEnv(defaultConfig.server);
  fs.writeFileSync(
    path.join(process.cwd(), "/src/dev.app.config.ts"),
    `export default ${JSON.stringify(devConfig)}`,
  );
}

function buildConfig() {
  const defaultConfig = readDefaultConfig();
  const originConfig = readOriginConfig();
  buildDevConfig(originConfig, defaultConfig);
}

buildConfig();
