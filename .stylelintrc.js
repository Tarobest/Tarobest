module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-scss",
    "stylelint-config-idiomatic-order",
  ],
  plugins: ["stylelint-order"],
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
  ignoreFiles: [
    "**/*.js",
    "**/*.ts",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.json",
    "**/*.md",
    "**/*.yaml",
  ],
  rules: {
    // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    "no-descending-specificity": null,
    "selector-class-pattern": null, //类选择器命名规则
    "selector-id-pattern": null, //id选择器命名规则
    "selector-type-no-unknown": null, //未知的选择器
    "at-rule-no-unknown": null, //未知的规则
    "unit-no-unknown": null,
  },
};
