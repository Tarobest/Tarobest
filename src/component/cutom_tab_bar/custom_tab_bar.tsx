import "./cutom_tab_bar.scss";

import { useState } from "react";

import { View, Image, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";

function CustomTabBar(props) {
  const Tabpages = ["../home/index", "../about/index"];
  const { tabItems } = props;
  const [selectedIndex, setIndex] = useState(0);
  useLoad(() => {
    Taro.getStorage({
      key: "selectedIndex",
      success: function (res) {
        setIndex(res.data);
      },
    });
  });

  return (
    <View className='custom_tab_bar'>
      {tabItems.map((item, index) => (
        <View
          key={index}
          className='tab_item'
          onClick={() => {
            Taro.setStorage({
              key: "selectedIndex",
              data: index,
            });
            Taro.switchTab({
              url: Tabpages[index],
            });
          }}>
          <Image
            className='tab_icon'
            src={selectedIndex === index ? item.selectIcon : item.icon}></Image>
          <Text
            className={selectedIndex === index ? "tab_textactive" : "tab_text"}>
            {item.text}
          </Text>
        </View>
      ))}
    </View>
  );
}
export default CustomTabBar;
