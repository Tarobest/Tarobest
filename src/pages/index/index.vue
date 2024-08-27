<template>


  <view className="container">
    <view className="header">
      <text>欢迎访问我们的网站</text>
    </view>

    <view className="section">
      <text>内容</text>
      <text>这里是服务内容的介绍。根据屏幕宽度不同，这段文字的布局会有所变化。</text>
    </view>
    <view className="footer">
      <text>© ls</text>
    </view>
  </view>


  <view>
    <h1>{{ $t('hello') }}</h1>
    <p>{{ $t('welcome') }}</p>
    <button @click="switchLanguage">Switch Language</button>
  </view>


</template>

<script lang="ts" setup>
import './index.scss'

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

function switchLanguage() {
  if (locale.value === 'en') {
    locale.value = 'zh';
  } else {
    locale.value = 'en';
  }
}

</script>
