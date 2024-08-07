import { createApp } from 'vue'
import './app.scss'
import Unocss from 'unocss'

const App = createApp({
// 定义 Unocss 配置
  const options = {
    // 你的 Unocss 配置
  }

// 创建 Unocss 实例并集成到 Vue
  const unocss = new Unocss(options)
  app.use(unocss.css) // 使用生成的原子 CSS
  app.use(unocss.directive) // 使用指令
})

export default App
