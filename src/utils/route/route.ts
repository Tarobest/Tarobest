import Taro from "@tarojs/taro";
import switchTab from "./switchTab";
import navigateBack from "./navigateBack";
import getNowRouteinfo from "./getNowRouteinfo";

export interface Options {
  success?: Function;
  fail?: Function;
  complete?: Function;
}
enum OpenType {
  navigateTo = "navigateTo",
  redirectTo = "redirectTo",
  reLaunch = "reLaunch",
}

const TarobestRouter = {
  navigateTo: navigator(OpenType.navigateTo),
  redirectTo: navigator(OpenType.redirectTo),
  switchTab,
  navigateBack,
  reLaunch: navigator(OpenType.reLaunch),
  getNowRouteinfo,
};

function navigator(openType: OpenType) {
  return (
    url: string,
    params = {} as Record<string, any>,
    options = {} as Options,
  ): void => {
    if (typeof url !== "string" || !url.trim()) {
      throw new Error("The 'url' parameter must be a non-empty string.");
    }

    if (
      typeof params !== "object" ||
      params === null ||
      Array.isArray(params)
    ) {
      throw new Error("The 'params' parameter must be an object.");
    }

    const searchParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null) {
        searchParams.set(key, encodeURIComponent(String(value)));
      }
    });
    if (openType === OpenType.navigateTo) {
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
    } else if (openType === OpenType.redirectTo) {
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
    } else if (openType === OpenType.reLaunch) {
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
  };
}

export default TarobestRouter;
