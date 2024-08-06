import i18n from "i18next";
import Taro from "@tarojs/taro";
import { initReactI18next } from "react-i18next";
import en from "./lang/en.json";
import zh from "./lang/zh.json";

Taro.getSystemInfo().then(res => {
  i18n.use(initReactI18next).init({
    resources: {
      en,
      zh,
    },
    lng: res.language,
    fallbackLng: "en",
  });
});

export default i18n;
