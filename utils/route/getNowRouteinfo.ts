import Taro from "@tarojs/taro";

/**
 * 获取当前页面路由信息
 * @returns {params,path}
 */
function getNowRouteinfo() {
  const params = Taro.getCurrentInstance().router?.params;

  let path = Taro.getCurrentInstance().router?.path;

  path = path?.includes("?") ? path?.split("?")[0] : path;

  return { params, path };
}

export default getNowRouteinfo;
