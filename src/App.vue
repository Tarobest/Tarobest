<script lang="ts" setup>
import {RouterView, RouterLink} from "vue-router"
</script>

<template>
<div>
  <h1>eslint + prettier + husky + stylelint + CommitLint + .vscode配置</h1>
  <div>
    <router-link to="/home">首页</router-link>
    <br>
    <br>
    <router-link to="/about">关于</router-link>
  </div>
  <div>
    <router-view></router-view>
  </div>
</div>
</template>