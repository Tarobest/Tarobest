import Taro from "@tarojs/taro";
import { Options } from "./route";

/**
 * 跳转到指定页面
 * @param url 页面路径
 * @param params 参数对象
 * @param options 可选参数对象，用于配置导航行为。{
  success?: Function;
  fail?: Function;
  complete?: Function;
}
 */
export function navigateTo(
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
  Taro.navigateTo({
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

/**
 * 重定向到指定页面
 * @param url 页面路径
 * @param params 参数对象
 * @param options 可选参数对象，用于配置导航行为。{
  success?: Function;
  fail?: Function;
  complete?: Function;
}
 */
export function redirectTo(
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
  Taro.redirectTo({
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

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param url 页面路径
 * @param params 参数对象
 * @param options 可选参数对象，用于配置导航行为。{
  success?: Function;
  fail?: Function;
  complete?: Function;
}
 */
export function reLaunch(
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
