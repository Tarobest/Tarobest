import Taro from "@tarojs/taro";
import { Options } from "./route";

/**
 * 关闭当前页面，返回上一级或多级页面。
 * @param delta 导航的层级数，默认为 1。
 * @param options 可选参数对象，用于配置导航行为。{
  success?: Function;
  fail?: Function;
  complete?: Function;
}
 */
export default function navigateBack(
  delta: number = 1,
  options: Options = {},
): void {
  Taro.navigateBack({
    delta,
    success: () => {
      options.success && options.success();
    },
    fail: () => {
      options.fail && options.fail();
    },
    complete: () => {
      options.complete && options.complete();
    },
  });
}
