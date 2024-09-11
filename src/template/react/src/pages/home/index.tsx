import "./index.scss";
import React from 'react'
import { useLoad } from "@tarojs/taro";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <view className='container'>
      <view className='header'>
        <text>欢迎访问我们的网站</text>
      </view>

      <view className='section'>
        <text>内容</text>
        <text>
          这里是服务内容的介绍。根据屏幕宽度不同，这段文字的布局会有所变化。
        </text>
      </view>
      <view className='footer'>
        <text>© ls</text>
      </view>
    </view>
  );
}
