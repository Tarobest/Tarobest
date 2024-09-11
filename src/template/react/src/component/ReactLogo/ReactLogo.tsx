import { View, Image } from "@tarojs/components";
import React from 'react'
import logo from "./logo.svg";
import "./ReactLogo.css";

export default function ReactLogo() {
  return (
    <View className='ReactLogo'>
      <View className='ReactLogo-header'>
        <Image src={logo} className='ReactLogo-logo' />
      </View>
    </View>
  );
}
