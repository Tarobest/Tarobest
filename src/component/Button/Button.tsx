import { View, Button } from "@tarojs/components";

import "./Button.scss";

export default function mybutton({ children, hansleClick }) {
  return (
    <View className='buttonBox'>
      <Button onClick={hansleClick} className='Button'>
        {children}
      </Button>
    </View>
  );
}
