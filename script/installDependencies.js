const fs = require("fs");
const { exec } = require("child_process");

if (!fs.existsSync("package.json")) {
  console.error("找不到 package.json 文件");
  process.exit(1);
}

console.log("正在安装依赖...");
// 执行 pnpm install 命令
exec("pnpm install", (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`错误输出: ${stderr}`);
    return;
  }
  console.log("安装完成！");
});
