import "./index.scss";
import React from 'react'
import ReactLogo from "../../component/ReactLogo/ReactLogo";
import TarobestRouter from "../../utils/route/route";
import Mybutton from "../../component/Button/Button";

import { useLoad } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  function handleClick() {
    const page = TarobestRouter.getNowRouteinfo();
    console.log("params:", page.params);
    console.log("path:", page.path);
  }

  return (
    <View className='index'>
      <View className='box'>Tarobest+React</View>
      <Mybutton handleClick={handleClick}>打印页面路由信息</Mybutton>
      <ReactLogo></ReactLogo>
    </View>
  );
}
