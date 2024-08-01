import Taro from "@tarojs/taro";
import { Options } from "./route";

/**
 * 导航至指定Tab页的 URL 
 * @param url 目标 URL 地址。
 * @param options 可选参数对象，用于配置导航行为。{
  success?: Function;
  fail?: Function;
  complete?: Function;
}
 */
export default function switchTab(url: string, options: Options = {}): void {
  if (typeof url !== "string" || !url.trim()) {
    throw new Error("The 'url' parameter must be a non-empty string.");
  }
  Taro.switchTab({
    url,
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
