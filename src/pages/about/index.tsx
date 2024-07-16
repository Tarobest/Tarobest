import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import ReactLogo from "../../component/ReactLogo/ReactLogo";
import "./index.css";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className='index'>
      <View className='box'>Tarobest+React</View>
      <ReactLogo></ReactLogo>
    </View>
  );
}
