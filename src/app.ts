import { PropsWithChildren } from "react";
import Taro, { useLaunch, useUnload } from "@tarojs/taro";
import "./i18n";
import "./app.css";
import './uno.css';

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log("App launched.");
    // Taro.getSystemInfo().then(res => {
    //   //获取设备语言
    //   const lang = res.language;
    //   console.log(lang);
    //   i18n.changeLanguage(lang);
    // });
    //tabbar初始化
    Taro.setStorage({
      key: "selectedIndex",
      data: 0,
    });
  });

  useUnload(() => {
    Taro.removeStorage({
      key: "selectedIndex",
    });
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
