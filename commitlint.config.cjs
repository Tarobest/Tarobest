module.exports = {
  // 继承的规则
  extend: ['@commitment/config-conventional'],
  // 自定义规范
  rules: {
    'subject-case': [0], //subject的大小写不做校验

    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能
        'fix', // 修复缺陷
        'docs', // 文档变化
        'style', // 代码格式
        'refactor', // 代码重构
        'perf', // 性能优化
        'test', // 添加疏漏测试或者已有测试改动
        'build', // 构建流程，外部依赖变更
        'ci', // 修改
        'revert', // 回滚 commit
        'chore' // 对构建过程或者工具和库的更改
      ]
    ]
  }
}
