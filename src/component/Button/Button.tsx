import { View, Button } from "@tarojs/components";
import "./Button.css";

export default function mybutton({ children, handleClick }) {
  return (
    <View className='buttonBox'>
      <Button onClick={handleClick} className='Button'>
        {children}
      </Button>
    </View>
  );
}
