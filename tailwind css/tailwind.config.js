// tailwind.config.js
module.exports = {
  purge: [], // 生产环境下应该配置需要清理的文件，开发环境可以留空
  darkMode: false, // 或 'media' 或 'class'
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#fff', // 主要背景色
        'secondary': '#eee', // 辅助背景色
      },
      textColor: {
        'primary': '#000', // 主要文本色
        'secondary': '#666', // 辅助文本色
      },
      fontSize: {
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 小号字体大小
        'base': ['1rem', { lineHeight: '1.5rem' }], // 基础字体大小
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 大号字体大小
        'xl': ['1.25rem', { lineHeight: '1.75rem' }], // 超大号字体大小
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 2倍号字体大小

      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'], // 无衬线字体
        serif: ['ui-serif', 'Georgia'], // 衬线字体
        mono: ['ui-monospace', 'SFMono-Regular'], // 等宽字体
      },
      spacing: {
        'px': '1px',
        '0': '0',

      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'default': '0.25rem',
        'lg': '0.5rem',
        'full': '9999px',
      },
      borderWidth: {
        '0': '0',
        '1': '1px',

      },

      transitionProperty: {
        'none': 'none',
        'all': 'all',
        'color': 'color',
        'background-color': 'background-color',
        'border-color': 'border-color',
        'text-indent': 'text-indent',
        'letter-spacing': 'letter-spacing',
        'word-spacing': 'word-spacing',
        'font-size': 'font-size',
        'font-weight': 'font-weight',
        'padding': 'padding',
        'margin': 'margin',
        'opacity': 'opacity',
        'scale': 'scale',
      },
      transitionDuration: {
        'default': '300ms',
        'm faster': '200ms',
        'slower': '500ms',
      },
      transitionTimingFunction: {
        'default': 'ease',
        'in-out': 'ease-in-out',
        'out': 'ease-out',
        'in': 'ease-in',
      },
      transitionDelay: {
        'default': '0s',
        'after-clip': '0.1s',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
}