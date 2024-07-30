import { View, Text, Image, Icon } from "@tarojs/components";
import { useState } from "react";
import { useLoad } from "@tarojs/taro";
import Mybutton from "../../component/Button/Button";
import { BubbleList } from "../../component/background/bubble";
import "./index.css";
import TarobestRouter from "../../utils/route/route";

export default function Index() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  useLoad(() => {
    console.log("Page loaded.");
  });

  const handleClick2 = () => {
    // const { params, path } = TarobestRouter.getNowRouteinfo();
    // console.log("params:", params);
    // console.log("path:", path);
    console.log("跳转");
    TarobestRouter.navigateTo("/pages/test/index", {
      id: 1,
      msg: "imimm & omomo",
    });
  };

  return (
    <View className='index'>
      <BubbleList></BubbleList>
      <View className='box'>Tarobest</View>
      <Mybutton handleClick={handleClick}>count:{count}</Mybutton>
      <Text>Button 示例</Text>
      <Image src='https://pic3.zhimg.com/v2-e52354ffdbd94a8e0a7649eacd34a788_r.jpg?source=1940ef5c'></Image>
      <Text>Image示例</Text>
      <View className='iconBox'>
        <Icon type='success'></Icon>
        <Icon type='success_no_circle'></Icon>
        <Icon type='info'></Icon>
        <Icon type='warn'></Icon>
        <Icon type='clear'></Icon>
        <Icon type='waiting'></Icon>
        <Icon type='search'></Icon>
      </View>
      <Text>Icon 示例</Text>
      <Mybutton handleClick={handleClick2}>跳转到test</Mybutton>
    </View>
  );
}
