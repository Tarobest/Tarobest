import "./index.scss";

import CustomTabBar from "../../component/cutom_tab_bar/custom_tab_bar";
import ReactLogo from "../../component/ReactLogo/ReactLogo";

import { useTranslation } from "react-i18next";

import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";

export default function Index() {
  const { t } = useTranslation();
  useLoad(() => {
    console.log("Page loaded.");
    Taro.setNavigationBarTitle({
      title: t("main:About"),
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
      <View className='box'>Tarobest+React</View>
      <ReactLogo></ReactLogo>
      <CustomTabBar tabItems={tabItems}></CustomTabBar>
    </View>
  );
}
