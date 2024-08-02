// webpack.config.js
module.exports = function () {
  return import('@unocss/webpack').then(({ default: UnoCSS }) => ({
    plugins: [
      UnoCSS()
    ],
    optimization: {
      realContentHash: true
    }
  }))
}