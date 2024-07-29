import navigateTo from "./navigateTo";
import redirectTo from "./redirectTo";
import switchTab from "./switchTab";
import navigateBack from "./navigateBack";
import reLaunch from "./reLaunch";
import getNowRouteinfo from "./getNowRouteinfo";

export interface Options {
  success?: Function;
  fail?: Function;
  complete?: Function;
}

const TarobestRouter = {
  navigateTo,
  redirectTo,
  switchTab,
  navigateBack,
  reLaunch,
  getNowRouteinfo,
};

export default TarobestRouter;
