module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0],
    "type-enum": [
        2, 
        "always",
         [
         "feat",//新增功能
         "fix",//修复缺陷
         "docs",//文档变更
         "style",//代码格式修正
         "refactor",//代码重构
         "perf",//性能优化
         "test",//添加疏漏测试或者已有测试改动
         "build",//构建流程，外部依赖变更
         "cli",//修改 CI 配置，脚本
         "revert",//回滚 commit
         'chore'//对构建过程或辅助工具和库的更改(不影响源文件和测试用例)
        ]
    ]
  }
}
