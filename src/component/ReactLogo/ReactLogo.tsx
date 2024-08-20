import { View, Image } from "@tarojs/components";

import logo from "./logo.svg";
import "./ReactLogo.scss";

export default function ReactLogo() {
  return (
    <View className='ReactLogo'>
      <View className='ReactLogo-header'>
        <Image src={logo} className='ReactLogo-logo' />
      </View>
    </View>
  );
}
