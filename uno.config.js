import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    'btn': 'px-4 py-2 rounded-md',
    'btn-primary': 'bg-blue-500 text-white',
  },

  rules: [
    ['m-1', { margin: '1px' }],
  ],

  presets: [
    presetUno(), // 添加 UnoCSS 的默认样式预设
  ],
})