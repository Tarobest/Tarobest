import { View, Button } from "@tarojs/components";
import TarobestRouter from "../../utils/route/route";

export default function () {
  return (
    <View className='Box'>
      <View>test</View>
      <Button
        onClick={() => {
          const { params, path } = TarobestRouter.getNowRouteinfo();
          console.log("params:", params);
          console.log("path:", path);
        }}
      >
        打印路由信息
      </Button>
    </View>
  );
}
