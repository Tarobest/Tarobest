export default defineAppConfig({
  pages: ['pages/index/index'],
  subpackages: [
    {
      root: 'pages/index',
      pages: ['index']
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
