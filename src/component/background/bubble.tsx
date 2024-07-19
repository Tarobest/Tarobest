import { View } from "@tarojs/components";
import "./bubble.css";

const BubbleList = () => {
  const bubbleArray = Array.from({ length: 40 }, (_, index) => {
    const randomValue = Math.floor(Math.random() * 21) + 10; // 生成10到30之间的随机数
    return (
      <View
        key={index}
        className='bubble'
        style={{ "--i": randomValue }}
      ></View>
    );
  });
  return (
    <View className='bubbleBox'>
      <>{bubbleArray}</>;
    </View>
  );
};

export { BubbleList };
