import Taro from "@tarojs/taro";
import { Options } from "./route";

/**
 * 关闭所有页面，打开指定得url页面
 * @param url 目标 URL 地址。
 * @param params 可选参数对象，用于构建查询字符串。
 * @param options 可选参数对象，用于配置导航行为。{
  success?: Function;
  fail?: Function;
  complete?: Function;
}
 */
export default function reLaunch(
  url: string,
  params = {} as Record<string, any>,
  options = {} as Options,
): void {
  if (typeof url !== "string" || !url.trim()) {
    throw new Error("The 'url' parameter must be a non-empty string.");
  }

  if (typeof params !== "object" || params === null || Array.isArray(params)) {
    throw new Error("The 'params' parameter must be an object.");
  }

  const searchParams = new URLSearchParams();

  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== undefined && value !== null) {
      searchParams.set(key, encodeURIComponent(String(value)));
    }
  });
  // console.log(
  //   `${url}${searchParams.toString() !== "" ? "?" : ""}${searchParams.toString()}`,
  // );
  Taro.reLaunch({
    url: `${url}${searchParams.toString() !== "" ? "?" : ""}${searchParams.toString()}`,
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
