import { createApp } from 'vue';

import { createI18n } from 'vue-i18n';
import en from './messages/en.js';
import zh from './messages/zh.js';

const i18n = createI18n({
  legacy: false, // 兼容 Vue 2 的选项，Vue 3 中使用 Composition API
  locale: 'en', // 设置初始语言环境
  messages: {
    en,
    zh
  }
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');