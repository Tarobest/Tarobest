import { View, Text, Image, Icon } from "@tarojs/components";
import { useState } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import { useTranslation } from "react-i18next";
import Mybutton from "../../component/Button/Button";
import { BubbleList } from "../../component/background/bubble";
import CustomTabBar from "../../component/cutom_tab_bar/custom_tab_bar";
import "./index.css";

export default function Index() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  useLoad(() => {
    console.log("Page loaded.");
    Taro.setNavigationBarTitle({
      title: t("main:home"),
    });
  });

  const tabItems = [
    {
      icon: "../../asset/icon/homeTab.png",
      selectIcon: "../../asset/icon/homeTabSelect.png",
      text: t("main:home"),
    },
    {
      icon: "../../asset/icon/about.png",
      selectIcon: "../../asset/icon/aboutSelect.png",
      text: t("main:About"),
    },
  ];

  return (
    <View className='index'>
      <BubbleList></BubbleList>
      <View className='box'>Tarobest</View>
      <Mybutton hansleClick={handleClick}>count:{count}</Mybutton>
      <Text>Button {t("main:example")}</Text>
      <Image
        className='egimage'
        src='https://pic3.zhimg.com/v2-e52354ffdbd94a8e0a7649eacd34a788_r.jpg?source=1940ef5c'></Image>
      <Text>Image {t("main:example")}</Text>
      <View className='iconBox'>
        <Icon type='success'></Icon>
        <Icon type='success_no_circle'></Icon>
        <Icon type='info'></Icon>
        <Icon type='warn'></Icon>
        <Icon type='clear'></Icon>
        <Icon type='waiting'></Icon>
        <Icon type='search'></Icon>
      </View>
      <Text>Icon {t("main:example")}</Text>
      <CustomTabBar tabItems={tabItems}></CustomTabBar>
    </View>
  );
}
