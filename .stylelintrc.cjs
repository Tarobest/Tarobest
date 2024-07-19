// 和那个eslintrc.cjs的基本的配置的模式是差不多的
// 开始配置

module.exports = {
  extends: [
    // 开始配置需要使用的插件有那些
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    // "stylelint-config-recommended-vue/scss",
    // "stylelint-config-html/vue",
    'stylelint-config-recess-order'
  ],

  // 开始实现指定不同的文件的使用的解析器
  overrides: [
    {
      files: ['**/*.{vue, html}'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['**/*.{css, scss}'],
      customSyntax: 'postcss-scss'
    }
  ],

  // 开始实现自定义规则
  rules: {
    // 开始实现自己的自定义规则
    // 开始设置允许那个global,export,v-deep伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep']
      }
    ],
    // 开始实现配置我们的其他的一些设置选项

    'selector-class-pattern': null,
    'selector-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'color-function-notation': null,
    'rule-empty-line-before': null,
    //"no-descending-specificity":null,
    //"number-leading-zero":null,
    'declaration-block-no-redundant-longhand-properties': null,
    //"declaration-pseudo-class-properties":null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-duplicate-selectors': null, // 设置为允许含有重复的选择器
    'color-no-invalid-hex': null
  }
}
