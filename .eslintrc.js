// 用于实现配置Eslint代码质量检查的部分
module.exports = {
  root: true,

  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    // eslint-disable-next-line no-inline-comments
    'plugin:prettier/recommended', // 使用prettier的规则格式化代码
    // './.eslintrc-auto-import.json', // 使eslint识别自动引入的组件和API
    'plugin:jsdoc/recommended',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-typescript'
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }]
      }
    }
  ],
  parser: 'vue-eslint-parser',
  // 设置解析选项
  parserOptions: {
    ecmaFeatures: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'jsdoc'],
  // 开始实现自定义规则
  rules: {
    // prettier 的规则设置
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        arrowParens: 'avoid',
        printWidth: 120
      }
    ],
    'no-console': 'warn',
    'no-debugger': 'warn',
    // eslint-disable-next-line no-inline-comments
    'vue/multi-word-component-names': 'off', // 关闭Vue3中要求.vue文件的名称必须为多个单词的检查
    // eslint-disable-next-line no-inline-comments
    'no-unused-vars': 'off', // 关闭Javascript变量未使用时的校验，在Typescript项目中必须禁用此校验，否则会误报
    // eslint-disable-next-line no-inline-comments
    '@typescript-eslint/no-unused-vars': 'off', // Typescript变量未使用时，仅发出警告，而不阻止程序运行
    'jsdoc/require-jsdoc': [
      // JSDoc 是一种用于 JavaScript 的文档生成工具，它可以解析代码中的注释并生成易于阅读的文档
      'error',
      {
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true
        },
        // eslint-disable-next-line no-inline-comments
        contexts: ['TSInterfaceDeclaration'] // 检查接口是否写注释
      }
    ],
    'no-inline-comments': 'error'
  }
  // 'spaced-commit': ['error', 'always']
}
