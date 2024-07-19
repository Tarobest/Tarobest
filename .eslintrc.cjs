/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    // 开始配置我们的airbnb规范
    'airbnb-base',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  settings: {
    'import/resolver': {
      typescript: {
        // 开始配置我们的那个eslint-import-resolver-typescript来实现解决@问题
        project: './tsconfig.json'
      }
    }
  },

  // 我们是可以实现在rules里面实现配置自己的规则的
  rules: {
    // 首先下面的规则都是那个用来忽略某些的配置的的，"off" 或者 0 都是那个用来实现的一个那个关闭配置的方法
    // 实现的是那个解决生产依赖和开发依赖的问题
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    // 实现对后缀名的检测问题
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', ts: 'never', jsx: 'never', tsx: 'never' }
    ],

    // 用于实现解决默认暴露的问题
    'import/prefer-default-export': 0,
    // 用于实现那个自增自减的问题
    'no-plusplus': 0,

    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@app/**',
            group: 'external',
            position: 'after'
          }
        ],
        distinctGroup: false
      }
    ]
  }
}
